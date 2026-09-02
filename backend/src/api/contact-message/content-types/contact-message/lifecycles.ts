import type { Core } from '@strapi/strapi';

// Envoie une notification au cabinet (et un accusé de réception à l'expéditeur)
// à chaque nouveau message — formulaire de contact, devis et inscription
// newsletter passent tous par ce même content-type. Ne bloque jamais la
// création du message : un échec d'envoi (ex. RESEND_API_KEY absente tant que
// le domaine de prod n'est pas branché) est seulement journalisé.
export default {
  async afterCreate(event: any) {
    const strapi = (global as unknown as { strapi: Core.Strapi }).strapi;
    const { nom, email, telephone, structure, sujet, message } = event.result as {
      nom: string;
      email: string;
      telephone?: string | null;
      structure?: string | null;
      sujet?: string | null;
      message: string;
    };

    const mailTo = process.env.MAIL_TO || process.env.MAIL_REPLY_TO || 'cabinterformci@gmail.com';

    const details = [
      `Nom : ${nom}`,
      `Email : ${email}`,
      telephone ? `Téléphone : ${telephone}` : null,
      structure ? `Structure : ${structure}` : null,
      sujet ? `Sujet : ${sujet}` : null,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    try {
      await strapi.plugin('email').service('email').send({
        to: mailTo,
        replyTo: email,
        subject: `[Site web] ${sujet || 'Nouveau message de contact'}`,
        text: details,
      });
    } catch (error) {
      strapi.log.warn(`[email] Échec de la notification de contact : ${(error as Error).message}`);
    }

    try {
      await strapi.plugin('email').service('email').send({
        to: email,
        subject: 'INTERFORMCI — Votre message a bien été reçu',
        text: `Bonjour ${nom},\n\nNous avons bien reçu votre message et reviendrons vers vous rapidement.\n\nL'équipe INTERFORMCI`,
      });
    } catch (error) {
      strapi.log.warn(`[email] Échec de l'accusé de réception : ${(error as Error).message}`);
    }
  },
};

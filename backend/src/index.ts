import type { Core } from '@strapi/strapi';
import seed from './seed';

const PUBLIC_PERMISSIONS: Record<string, string[]> = {
  'service-pole': ['find', 'findOne'],
  domaine: ['find', 'findOne'],
  'formation-categorie': ['find', 'findOne'],
  temoignage: ['find', 'findOne'],
  'reference-projet': ['find', 'findOne'],
  partenaire: ['find', 'findOne'],
  'contact-message': ['create'],
  'page-accueil': ['find'],
  'infos-cabinet': ['find'],
  salle: ['find', 'findOne'],
  expert: ['find', 'findOne'],
};

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    return;
  }

  const permissionQuery = strapi.query('plugin::users-permissions.permission');

  for (const [controller, actions] of Object.entries(PUBLIC_PERMISSIONS)) {
    for (const action of actions) {
      const fullAction = `api::${controller}.${controller}.${action}`;
      const existing = await permissionQuery.findOne({
        where: { role: publicRole.id, action: fullAction },
      });

      if (!existing) {
        await permissionQuery.create({
          data: { action: fullAction, role: publicRole.id },
        });
      }
    }
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
    await seed({ strapi });
  },
};

import Spinner from './Spinner';

export default function PageLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-neutral">
      <Spinner className="h-10 w-10 text-primary" />
    </div>
  );
}

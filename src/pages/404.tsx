import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const path = router.asPath;
  if (path.includes('404')) {
    return <div>404 Error</div>;
  } else {
    router.replace(router.asPath);
    return <></>;
  }
};

export default ErrorPage;

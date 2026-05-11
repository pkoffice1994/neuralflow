export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/landing.html",
      permanent: false
    }
  };
}

export default function Home() {
  return null;
}

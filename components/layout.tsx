import Head from "next/head";

const Layout: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="root">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Overpass:wght@200;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </Head>
      <main className="main-flex-container">{children}</main>

      <style jsx>{`
        .root {
          height: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }

        .main-flex-container {
          display: flex;
          flex: 1;
          flex-direction: column;
          background-color: "#e1e5e9";
        }
      `}</style>

      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
          min-height: 100%;
          padding: 0;
          margin: 0;
          font-family: Overpass, -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Layout;

import Head from "next/head";
import Navbar from "./Navbar";

const Layout: React.FunctionComponent<{
  children: React.ReactNode;
  navbar: boolean;
}> = ({ children, navbar }) => {
  return (
    <div className="root">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
        <link
          rel="shortcut icon"
          href="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico"
        ></link>
      </Head>
      {navbar && <Navbar />}
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
          background-color: rgb(19, 19, 19);
        }
      `}</style>

      <style jsx global>{`
        html,
        body,
        #__next {
          height: 100%;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
        }

        body::-webkit-scrollbar {
          display: none;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Layout;

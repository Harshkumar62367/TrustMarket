import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;

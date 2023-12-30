import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.cookies.has("next-auth.session-token")) return true;
      return false;
    },
  },
});

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Admin authentication (Supabase)

The admin page uses Supabase Auth to verify email and password credentials on the server.

1. Create a Supabase project.
2. In **Authentication → Users**, create the admin account. Keep public sign-ups disabled so visitors cannot create accounts.
3. Copy the project URL and publishable key (or legacy anon key) from the Supabase API settings.
4. Create `.env.local` in the project root based on `.env.example`:

   ```dotenv
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-publishable-or-anon-key
   ```

5. Restart the Vite server after changing environment variables.

Never put a Supabase `service_role` key in this frontend project.

### Store CMS content and images in Supabase

1. In the Supabase dashboard for the same project, open **SQL Editor**.
2. Open `supabase/setup.sql` from this repository, copy its contents into a new SQL query, and run it. This creates the CMS table, public read/authenticated write policies, and the public `cms-media` image bucket.
3. In the website, sign in as the admin and open the Admin CMS page. It migrates the existing local CMS records into Supabase once, without overwriting records that already exist in the cloud. Any local base64 images are moved to Storage during this migration.
4. New or updated donations, news, classes, and activities are then saved to Supabase. Uploaded images are stored in `cms-media` and visible to site visitors.

Only create trusted admin accounts in Supabase. The SQL policies allow authenticated accounts to write CMS data, while anonymous visitors can only read it. Keep public sign-ups disabled.

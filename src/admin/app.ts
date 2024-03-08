export default {
  config: {
    locales: [
      'ru',
      'en'
    ],
    menu: {
      logo: "/resources/logo.png"
    },
    auth: {
      logo: "/resources/logo.png"
    },
    notifications: {
      releases: false,
    }
  },
  bootstrap(app: any) {
    console.log(app);
  },
};

import {apolloPrometheusPlugin} from "strapi-prometheus";


export default ({env}) => ({
  todo: {
    enabled: true,
  },
  tinymce: {
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-tinymce",
    config: {
      editor: {
        outputFormat: "html",
        editorConfig: {
          language: "ru",
          height: 600,
          min_height: 600,
          menubar: 'file edit insert view format table',
          mobile: {
            menubar: 'file edit insert view format table',
          },
          toolbar_mode: "scrolling",
          toolbar_sticky: true,
          plugins: [
            'autosave', 'image64', 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'importcss', 'emoticons',
            'anchor', 'searchreplace', 'visualblocks', 'visualchars', 'template', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'quickbars', 'pagebreak',
            'nonbreaking', 'hr', 'print', 'save', 'contextmenu', 'paste', 'textcolor', 'autoresize',
            'directionality', 'codesample', 'charmap', 'accordion'
          ],
          toolbar: 'undo redo | blocks fontfamily fontsize align lineheight | ' +
            'forecolor backcolor hr | bold italic underline strikethrough | ' +
            'formatselect | outdent indent | numlist bullist | link image table |  code preview | removeformat help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        },
      },
    },
  },
  menus: {
    config: {
      maxDepth: 3,
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        plugins: [apolloPrometheusPlugin],
        tracing: true,
      },
    },
  },
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: "http://" + env('MINIO_ENDPOINT') + "/uploads",
        s3Options: {
          credentials: {
            accessKeyId: env('MINIO_ROOT_USER'),
            secretAccessKey: env('MINIO_ROOT_PASSWORD'),
          },
          endpoint: "http://" + env('MINIO_ENDPOINT'),
          region: env('MINIO_REGION'),
          forcePathStyle: true,
          params: {
            Bucket: env('MINIO_BUCKET'),
          },
        }
      },
    },
  },
  "apollo-sandbox": {
    enabled: process.env.NODE_ENV !== "production",
  },
  'strapi-prometheus': {
    enabled: true,
    config: {
      prefix: '',
      fullURL: false,
      includeQuery: true,
      enabledMetrics: {
        koa: true,
        process: true,
        http: true,
        apollo: true,
      },
      interval: 10_000,
      customLabels: {
        name: "strapi-prometheus",
      },
    }
  }
});

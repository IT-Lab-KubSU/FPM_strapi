import path from "path";

export default () => ({
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
          // plugins:
          //   "advlist autolink lists link image charmap preview anchor \
          //   searchreplace visualblocks code fullscreen table emoticons nonbreaking \
          //   insertdatetime media table code help wordcount",
          // toolbar:
          //   "undo redo | styles | bold italic forecolor backcolor | \
          //   alignleft aligncenter alignright alignjustify | \
          //   media table emoticons visualblocks code|\
          //   nonbreaking bullist numlist outdent indent | removeformat | help",
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
        tracing: false,
      },
    },
  },
  "apollo-sandbox": {
    enabled: process.env.NODE_ENV !== "production",
  },
});

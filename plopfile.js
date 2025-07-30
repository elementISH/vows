module.exports = function (plop) {
  const componentTypes = ["atom", "molecule", "organism"];

  componentTypes.forEach((type) => {
    plop.setGenerator(type, {
      description: `Generate a ${type} with full folder structure`,
      prompts: [{ type: "input", name: "name", message: `Component name:` }],
      actions: [
        {
          type: "add",
          path: `src/components/${type}s/{{kebabCase name}}/logic.js`,
          templateFile: "plop-templates/component/logic.js.hbs",
        },
        {
          type: "add",
          path: `src/components/${type}s/{{kebabCase name}}/states.jsx`,
          templateFile: "plop-templates/component/states.jsx.hbs",
        },
        {
          type: "add",
          path: `src/components/${type}s/{{kebabCase name}}/index.jsx`,
          templateFile: "plop-templates/component/component.jsx.hbs",
        },
        {
          type: "modify",
          path: `src/components/${type}s/index.js`,
          pattern: /(\/\/ PLUG_ADD_EXPORT)/,
          template: `export { default as {{pascalCase name}} } from './{{kebabCase name}}';\n// PLUG_ADD_EXPORT`,
        },
        // components/organisms/index.js

        // PLUG_ADD_EXPORT
      ],
    });
  });

  plop.setGenerator("page", {
    description: "Generate a new page in App Router (with group)",
    prompts: [
      {
        type: "input",
        name: "group",
        message: "What is the page group (e.g. auth, shop, guest)?",
      },
      {
        type: "input",
        name: "name",
        message: "Page name (e.g. login, checkout, thank-you)",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/app/({{kebabCase group}})/{{kebabCase name}}/page.jsx",
        templateFile: "plop-templates/page/page.jsx.hbs",
      },
    ],
  });
};

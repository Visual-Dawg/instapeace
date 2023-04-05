module.exports = {
  extends: [
    "@antfu",
    "plugin:import/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "import/named": "off",
    "no-undef": "off",
    "@typescript-eslint/no-explicit-any": [
      "error",
      {
        ignoreRestArgs: true,
      },
    ],
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/consistent-type-definitions": [1, "type"],
    "@typescript-eslint/no-shadow": [
      "error",
      {
        ignoreTypeValueShadow: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_+$",
      },
    ],
    "@typescript-eslint/no-use-before-define": "off",
    "arrow-body-style": ["error", "as-needed"],
    "func-style": ["error", "declaration"],
    "import/extensions": "off",
    "import/no-default-export": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            group: "parent",
            pattern: "@/**/*.svelte",
            position: "after",
          },
          {
            group: "parent",
            pattern: "@/**",
            position: "before",
          },
          {
            group: "external",
            pattern: "@sing*/**",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["type"],
      },
    ],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-restricted-syntax": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    "spaced-comment": [
      "error",
      "always",
      {
        markers: ["/", "?", "!"],
      },
    ],
    "svelte/valid-compile": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/no-useless-undefined": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-top-level-await": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        ignore: ["\\.e2e$"],
      },
    ],
  },
}

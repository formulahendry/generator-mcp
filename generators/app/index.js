"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("mcpServerName", {
      desc: "MCP Server name",
      alias: "m",
      type: String
    });
    this.option("toolName", {
      desc: "Tool name for the MCP server",
      alias: "t",
      type: String
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the gnarly ${chalk.red("generator-mcp")} generator!`)
    );

    const prompts = [
      {
        type: "input",
        name: "mcpServerName",
        message: "What is the MCP Server name?",
        default: "Weather MCP Server",
        when: () => {
          return !this.options.mcpServerName; // Skip the prompt when the value is already passed as a command option
        },
        validate: name => {
          if (!name) {
            return "MCP Server name could not be empty";
          }

          return true;
        }
      },
      {
        type: "input",
        name: "toolName",
        message: "What is the tool name for the MCP server?",
        default: "get_forecast",
        when: () => {
          return !this.options.toolName; // Skip the prompt when the value is already passed as a command option
        },
        validate: name => {
          if (!name) {
            return "Tool name could not be empty";
          }

          return true;
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.mcpServerId = this.props.mcpServerName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("src", "index.ts"),
      this.destinationPath("src", "index.ts"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("src", "server.ts"),
      this.destinationPath("src", "server.ts"),
      this.props
    );
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json"),
      this.props
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};

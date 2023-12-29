/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly GITHUB_ID: string;
    readonly GITHUB_SECRET: string;
  }
}

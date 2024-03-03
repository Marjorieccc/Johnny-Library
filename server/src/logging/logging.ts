export default class Logging {
  public static info = (args: any) =>
    console.log(
      '\x1b[36m%s\x1b[0m',
      `${new Date().toLocaleString()} [INFO] `,
      typeof args === 'string' ? args : args
    )

  public static warn = (args: any) =>
    console.log(
      '\x1b[33m%s\x1b[0m',
      `${new Date().toLocaleString()} [WARN] `,
      typeof args === 'string' ? args : args
    )

  public static error = (args: any) =>
    console.log(
      '\x1b[31m',
      `${new Date().toLocaleString()} [ERROR] `,
      typeof args === 'string' ? args : args
    )
}


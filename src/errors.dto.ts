export class HttpExceptionDto {
  /**
   * The HTTP status code
   */
  statusCode!: number;
  /**
   * Messages detailing what caused the error
   */
  message!: string[];
  /**
   * The type of error
   */
  error!: string;
}

export class UnauthorizedDto {
  /**
   * The HTTP status code
   */
  statusCode!: number;
  /**
   * Type of error
   */
  message!: string;
}

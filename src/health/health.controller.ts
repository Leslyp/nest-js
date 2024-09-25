import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health check')
@Controller('health')
export class HealthController {
  @ApiOperation({
    summary: 'Health check endpoint to verify the web server is running',
  })
  @Get()
  healthCheck(): Record<string, unknown> {
    return {};
  }
}

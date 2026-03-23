import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryService } from './service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryResponseDto } from './dto/category-response';
import { ApiPaginatedResponse } from 'src/common/decorator/api-paginated-response.decorator';
import { GetListCategoriesQueryDto } from './dto/get-category-query';
import { PaginatedResult } from 'src/common/interfaces/response.interface';
import { CreateCategoryDto } from './dto/category-request';

@Injectable()
@ApiTags('Categories')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list course',
    description: 'Retrieves paginated categories',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of categories per page (default: 5, max: 10)',
    example: 10,
  })
  @ApiPaginatedResponse(CategoryResponseDto, {
    description: 'Categories retrieved successfully',
  })
  async listCategories(
    @Query() query: GetListCategoriesQueryDto,
  ): Promise<PaginatedResult<CategoryResponseDto>> {
    return await this.categoryService.listCategories(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create category' })
  async create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
    return await this.categoryService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category detail' })
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    return await this.categoryService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.categoryService.remove(id);
  }
}

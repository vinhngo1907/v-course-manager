import { DatabaseService } from '@modules/database/service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GetCategoryQueryDTO } from './dto/get-category-query';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category-request';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async listCategories(query: GetCategoryQueryDTO) {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const [categories, total] = await Promise.all([
      this.databaseService.category.findMany({
        skip: (page - 1) * limit,
        take: limit,
        // orderBy: { createdAt: 'desc' },
      }),
      this.databaseService.category.count(),
    ]);

    return {
      data: categories,
      meta: {
        page,
        limit,
        total,
        pageCount: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateCategoryDto) {
    return await this.databaseService.category.create({
      data: {
        name: dto.name,
      },
    });
  }

  async findOne(id: string) {
    const category = await this.databaseService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    await this.findOne(id); // check exists

    return await this.databaseService.category.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id); // check exists

    return await this.databaseService.category.delete({
      where: { id },
    });
  }
}

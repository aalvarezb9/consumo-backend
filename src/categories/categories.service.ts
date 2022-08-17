import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const createdCategoty = this.categoriesRepository.create(createCategoryDto);
    const savedCategory = await this.categoriesRepository.save(createdCategoty);
    return savedCategory;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOneOrFail({
      where: { id },
    });
    return category;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    this.categoriesRepository.merge(category, updateCategoryDto);
    const updatedCategory = await this.categoriesRepository.save(category);
    return updatedCategory;
  }

  async remove(id: string): Promise<Category> {
    const category = await this.findOne(id);
    const removedCategory = await this.categoriesRepository.remove(category);
    return removedCategory;
  }
}

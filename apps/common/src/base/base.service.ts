import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";

export abstract class BaseService<T extends ObjectLiteral> {
    protected model: Repository<T>;

    constructor(model: Repository<T>) {
        this.model = model;
    }
    
    getList(opts?: FindManyOptions<T>): Promise<T[]> {
      return this.model.find(opts);
    }

    getCount(): Promise<number> {
        return this.model.count();
    }

    getOne(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
        return this.model.findOneBy(where);
    }

    async remove(id: number): Promise<void> {
        await this.model.delete(id);
    }
}

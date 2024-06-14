import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getAll(page = 1, limit = 10, price, sort) {
        try {
            const filterByPrice = price ? { 'price': price } : {};
            let sortOrder = {};
            if (sort) sortOrder.name = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            const response = await ProductModel.paginate(filterByPrice, { page, limit, sort: sortOrder });
            return response;
        } catch (error) {
            console.log(`A ocurrido un error al intentar mostrar los productos  -->  ${error}`);
        };
    };

    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(`No se encuentra el producto solicitado  -->  ${error}`);
        };
    };

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(`A ocurrido un error al intentar crear el producto solicitado  -->  ${error}`);
        };
    };

    async update(id, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(`No se encontro el producto que desea actualizar  -->  ${error}`);
        };
    };

    async delete(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(`No se encontro el producto que desea eliminar  -->  ${error}`);
        };
    };
};
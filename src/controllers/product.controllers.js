import * as service from "../services/product.services.js";



export const getAll = async (req, res, next) => {
    try {
        const { page, limit, price, sort } = req.query;
        const response = await service.getAll(page, limit, price, sort);
        let urlNext = `http://localhost:8080/products?page=${response.nextPage}`;
        if (sort !== undefined) {
            if (price !== undefined) {
                return nextLink = `${urlNext}&sort=${sort}&price=${price}`;
            } else {
                return nextLink = `${urlNext}&sort=${sort}`;
            }
        } else {
            if (price !== undefined) {
                nextLink = response.hasNextPage ? `${urlNext}&price=${price}` : null;
            } else {
                nextLink = response.hasNextPage ? urlNext : null;
            }
        };
        let urlPrev = `http://localhost:8080/products?page=${response.prevPage}`;
        if (sort !== undefined) {
            if (price !== undefined) {
                return prevLink = `${urlPrev}&sort=${sort}&price=${price}`;
            } else {
                return prevLink = `${urlPrev}&sort=${sort}`;
            }
        } else {
            if (price !== undefined) {
                prevLink = response.hasPrevPage ? `${urlPrev}&price=${price}` : null;
            } else {
                prevLink = response.hasPrevPage ? urlPrev : null;
            }
        };
        res.status(200).json({
            status: 'success',
            payload: response.docs,
            totalPages: response.totalDocs,
            nextPage: response.nextPage,
            prevPage: response.prevPage,
            page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            nextLink,
            prevLink
        });
    } catch (error) {
        next(error.message);
    };
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getById(id);
        if (!response) res.status(400).json({ msg: `No se pudo encontrar el producto ${id}` });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    };
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (!newProd) res.status(400).json({ msg: "Ocurrido un error al intentar crear el producto solicitado" });
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    };
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productUpdated = await service.update(id, req.body);
        if (!productUpdated) res.status(400).json({ msg: `Ocurrido un error al intentar actualizar el producto ${id}` });
        else res.status(200).json(productUpdated);
    } catch (error) {
        next(error.message);
    };
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productRemoved = await service.remove(id);
        if (!productRemoved) res.status(400).json({ msg: `Ocurrido un error al intentar eliminar el producto ${id}` });
        else res.status(200).json({ msg: `El producto ${id} fue eliminado` });
    } catch (error) {
        next(error.message);
    };
};
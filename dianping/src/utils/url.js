export default {
    getProductLsit(path, rowIndex = 0, pageSize = 3) {
        return `/mock/products/${path}.json?rowIndex=${rowIndex}&pageSize=${pageSize}`
    },
    getProductDetail(id) {
        return `/mock/product_detail/${id}.json`
    },
    getShop(id) {
        return `/mock/shops/${id}.json`
    },
    getPopularKeywords() {
        return `/mock/keywords/popular.json`
    },
    getSearchResult(keyword) {
        return `/mock/keywords/related.json?keyword=${keyword}`
    },
    getRelatedShopsByKeyword(keyword) {
        return `/mock/shops/related.json?keyword=${keyword}`
    },
    getOrders() {
        return `/mock/orders/orders.json`
    }
}
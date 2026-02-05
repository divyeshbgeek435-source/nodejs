/**
 * Helper function to format merchantId
 * If a number is provided, converts it to gid://shopify/Shop/${number}
 * If already formatted, returns as is
 */
const formatMerchantId = (merchantId) => {
    if (!merchantId) return null;

    // If already formatted, return as is
    if (merchantId.startsWith('gid://shopify/Shop/')) {
        return merchantId;
    }

    // Extract number from string if it contains numbers
    const numberMatch = merchantId.toString().match(/\d+/);
    if (numberMatch) {
        return `gid://shopify/Shop/${numberMatch[0]}`;
    }

    // If no number found, return as is (might be a different format)
    return merchantId;
};

module.exports = {
    formatMerchantId
};
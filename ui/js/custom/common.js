import apiConfig from './config.js';

// Global API call function
function callApi(method, url, data, callback = null) {
    $.ajax({
        method: method,
        url: url,
        data: data,
        success: function(response) {
            if (callback && typeof callback === 'function') {
                callback(response);
            } else {
                window.location.reload();
            }
        },
        error: function(xhr, status, error) {
            console.error('API Error:', status, error);
            alert('An error occurred: ' + error);
        }
    });
}

// Calculate order values
function calculateValue() {
    let total = 0;
    $(".product-item").each(function(index) {
        const qty = parseFloat($(this).find('.product-qty').val()) || 0;
        const price = parseFloat($(this).find('#product_price').val()) || 0;
        const itemTotal = price * qty;
        
        $(this).find('#item_total').val(itemTotal.toFixed(2));
        total += itemTotal;
    });
    $("#product_grand_total").val(total.toFixed(2));
}

// Data parsers
const orderParser = (order) => ({
    id: order.id,
    date: order.order_date || new Date().toISOString().split('T')[0],
    orderNo: order.order_number || 'N/A',
    customerName: order.customer_name || 'Unknown',
    cost: parseFloat(order.total_amount) || 0
});

const productParser = (product) => ({
    id: product.product_id,
    name: product.name || 'Unnamed Product',
    unit: product.uom_name || 'unit',
    price: parseFloat(product.price_per_unit) || 0
});

const productDropParser = (product) => ({
    id: product.id,
    name: product.title || product.name || 'Product'
});

// Initialize common functionality
$(document).ready(function() {
    // Initialize tooltips if needed
    $('[data-toggle="tooltip"]').tooltip();
    
    // Global error handler for AJAX calls
    $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
        console.error('AJAX Error:', settings.url, thrownError);
    });

    // Example of binding calculate function to relevant elements
    $(document).on('change keyup', '.product-qty, #product_price', calculateValue);
});

// Export functions if using ES modules
export {
    callApi,
    calculateValue,
    orderParser,
    productParser,
    productDropParser,
    apiConfig
};
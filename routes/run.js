const run = (middlewares, controller) => {
    return (req, res) => {
        const executeMiddlewares = (index) => {
            if (index < middlewares.length) {
                middlewares[index](req, res, () => executeMiddlewares(index + 1));
            } else {
                controller(req, res); // Tất cả middleware đã hoàn thành, gọi controller
            }
        };

        executeMiddlewares(0); // Bắt đầu thực thi từ middleware đầu tiên
    };
};

module.exports = run;
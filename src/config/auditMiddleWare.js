const auditService = require("../services/auditService");

const auditMiddleware = async (req, res, next) => {
  try {
    // Only log successful actions
    res.on("finish", async () => {
      if (res.statusCode < 400) {
        const { method, originalUrl } = req;
        const userId = req.user ? req.user.id : null;

        await auditService.logAction({
          userId,
          action: `${method} ${originalUrl}`,
          status: res.statusCode,
          timestamp: new Date(),
        });
      }
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auditMiddleware;

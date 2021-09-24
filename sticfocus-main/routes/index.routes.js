module.exports = (app) => {
  let authRoute = require("./auth.routes");
  let userRoute = require("./user/user.routes");
  let uploadRoute = require("./upload.routes");
  let videoRoute = require("./video/video.routes");
  let videoLikeRoute = require("./video/videoLike.routes");
  let videoDislikeRoute = require("./video/videoDislike.router");
  let videoCommentRoute = require("./video/videoComment.routes");
  let videoCommentLikeRoute = require("./video/videoCommentLike.routes");
  let videoCommentDislikeRoute= require("./video/videoCommentDislike.routes");
  let commentReplyRoute = require("./video/commentReply/commentReply.routes");
  let CommentReplyLikeRoute = require("./video/commentReply/commentReplyLike.routes");
  let authorRoute = require("./author/author.routes");
  let courseRoute = require("./courses/course.routes");
  let topicRoute = require("./topic.routes");
  let schoolRoute = require("./school/school.routes");
  let InstitudeRoute = require("./Institude/Institude.routes");
  let followerRoute= require("./followers/follower.routes");

  let notificationRoute = require("./notifications/notificationlist.routes");

  app.use("/api/authentication", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/upload", uploadRoute);
  app.use("/api/video", videoRoute);
  app.use("/api/videoLike", videoLikeRoute);
  app.use("/api/videoDislike",videoDislikeRoute);
  app.use("/api/videoComment", videoCommentRoute);
  app.use("/api/videoCommentLike", videoCommentLikeRoute);
  app.use("/api/videoCommentDislike",videoCommentDislikeRoute);
  app.use("/api/commentReply", commentReplyRoute);
  app.use("/api/CommentReplyLike", CommentReplyLikeRoute);
  app.use("/api/author", authorRoute);
  app.use("/api/course", courseRoute);
  app.use("/api/topic", topicRoute);
  app.use("/api/school",schoolRoute);
  app.use("/api/Institude",InstitudeRoute);
  app.use("/api/followers",followerRoute);

  app.use("/api/notification", notificationRoute);

};
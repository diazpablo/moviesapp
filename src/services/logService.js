// import * as Sentry from "@sentry/react";

const init = () => {
	// Sentry.init({ dsn: "https://8c4664363f604a3bad9b7f578578212d@o436799.ingest.sentry.io/5398469" });
}

const log = (error) => {
	console.error(error);
	// Sentry.captureException(error);
}

export default {
	init,
	log
}
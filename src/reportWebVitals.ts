import { type ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry != null) {
        import('web-vitals').then(({
            getCLS,
            getFID,
            getFCP,
            getLCP,
            getTTFB
        }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        })
            .catch(console.error);
    }
};

export default reportWebVitals;

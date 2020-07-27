import React from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{height: '100%'}}
        >
            {value === index && (
                <div style={{height: '100%'}}>{children}</div>
            )}
        </div>
    );
}

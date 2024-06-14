"use client";

import { languages } from "@/constants/languages";
import Language from "./Language";
import React from "react";
import Skelleton from "./Skelleton";
import { useSearchParams } from "next/navigation";

const LanguagesList = () => {
    const languageSearch = useSearchParams().get('language_search') || '';

    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        setReady(true);
    }, []);

    return (
        <div className="flex flex-col gap-1">
            {!ready && (
                new Array(10).fill(0).map((_, index) => (<Skelleton key={index} className="h-14" />))
            )}
            {ready && (languages
                .filter((language) => {
                    return language.language.toLowerCase().includes(languageSearch.toLowerCase());
                }))
                .map((language) => (
                    <Language key={language.country} language={language} />
                ))}
        </div>
    );
};

export default LanguagesList;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";
import {auth, request} from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import { prefixFileUrlWithBackendUrl } from "@strapi/helper-plugin";
import { ac } from "@strapi/helper-plugin";

const TinyEditor = ({ onChange, name, value }) => {
    const [pluginConfig, setPluginConfig] = useState();
    const uploadUrl = `${prefixFileUrlWithBackendUrl("/upload")}`;

    useEffect(() => {
        const getPluginConfig = async () => {
            const editor = await request(`/${pluginId}/config/editor`, {
                method: "GET",
            });
            if (editor) {
                setPluginConfig(editor);
            }
        };
        getPluginConfig();
    }, []);

    return (
         pluginConfig ?
            <Editor
                tinymceScriptSrc={"/tinymce/js/tinymce/tinymce.min.js"}
                value={value}
                tagName={name}
                onEditorChange={(editorContent) => {
                    onChange({ target: { name, value: editorContent } });
                }}
                outputFormat={pluginConfig?.outputFormat || "html"}
                init={{
                    ...pluginConfig?.editorConfig,
                    images_upload_handler: async (blobInfo) => {
                      const formData = new FormData();
                      formData.append("files", blobInfo.blob());
                      return await fetch(uploadUrl, {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${auth.getToken()}`,
                          Accept: 'application/json',
                        },
                        body: formData,
                      })
                        .then((response) => response.json())
                        .then((data) => data[0]?.url ?? "")
                        .catch(function (err) {
                          console.error("error:", err);
                          return "";
                        });
                    },
                  }}
            />
            : <></>
    );
};
TinyEditor.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
};
export default TinyEditor;

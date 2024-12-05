// Redirect Generator
// developed by Tawhidur Rahman Dear, https://www.tawhidurrahmandear.com
// Live Preview available at https://www.devilhunter.net/p/redirect-generator.html

         document.querySelectorAll('.redirect-generator form').forEach(form => {
            form.addEventListener("submit", function(e) {
                e.preventDefault();

                const id = form.id;
                const resultArea = form.parentElement.querySelector('.redirect-generator_textarea');
                let txt = "";
                const src = form.querySelector('input[name="old"]') ? form.querySelector('input[name="old"]').value : "";
                const dest = form.querySelector('input[name="new"]') ? form.querySelector('input[name="new"]').value : "";
                
                if (id === "page-page") {
                    const lang = form.querySelector('select[name="page-gen-lang"]').value;
                    switch (lang) {
                        case "html":
                            txt = '<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv="refresh" content="0; url=' + dest + '">\n</head>\n<body>\n</body>\n</html>';
                            break;
                        case "js":
                            txt = '<!DOCTYPE html>\n<html>\n<body>\n<script type="text/javascript">\nwindow.location.replace("' + dest + '");\n</' + 'script>\n</body>\n</html>';
                            break;
                        case "php":
                            txt = '<?php\nheader("Location: ' + dest + '", true, 301);\nexit();\n?>';
                            break;
                        case "htaccess":
                            let urlPath = new URL(src).pathname;
                            txt = 'Redirect 301 "' + urlPath + '" "' + dest + '"';
                            break;
                        case "aspnet":
                            txt = '<script language="C#" runat="server">\nprotected void Page_Load(object sender, EventArgs e) {\nResponse.Status = "301 Moved Permanently";\nResponse.AddHeader("Location","' + dest + '");\nResponse.End();\n}\n</' + 'script>';
                            break;
                    }
                } else if (id === "domain-domain") {
                    txt = 'Options +FollowSymLinks\nRewriteEngine on\nRewriteRule (.*) https://' + dest + '/$1 [R=301,L]';
                } else if (id === "directory-directory") {
                    txt = 'RedirectMatch 301 ' + src + '(.*) ' + dest + '$1';
                } else if (id === "www") {
                    txt = 'Options +FollowSymlinks\nRewriteEngine on\nRewriteCond %{HTTP_HOST} ^' + dest + ' [NC]\nRewriteRule ^(.*)$ https://www.' + dest + '/$1 [R=301,NC]';
                }
                
                resultArea.value = txt;
            });
        });

        document.querySelectorAll('.redirect-generator_textarea').forEach(textarea => {
            textarea.addEventListener('click', function() {
                this.select();
            });
        });
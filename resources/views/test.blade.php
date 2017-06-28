<!DOCTYPE html>
<html lang="en">
    <head>
        <link href="bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
        <link href="bower_components/bootstrap/dist/css/bootstrap-theme.css" rel="stylesheet">

        <link href="css/roboto.css" rel="stylesheet">

        <script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

        <style>
            select:-moz-focusring {
                color: transparent;
                text-shadow: 0 0 0 #000;
            }
            div.alert {
                margin-top: 5px;
                margin-bottom: 0px;
            }
            body {
                padding: 15px;
                font-family: 'Roboto', sans-serif;
            }
            textarea {
                font-family: 'Roboto Mono', monospace;
            }
            table.layout {
                height: 100%;
            }
            td.form {
                width: 50%;
            }
            td {
                padding: 1px;
            }
            th {
                vertical-align: middle;
            }
            td.output {
                width: 100%;
                height: 100%;
            }
            iframe.output {
                border: 1px solid lightgrey;
                width: 100%;
                height: 100%;
                margin-left: 5px;
            }
        </style>
    </head>
    <body>
        <table class="layout"><tr><td class="form">
        <table>
            <tr>
                <th><label for="user">Login</label></th>
                <td></td>
                <td>
                    <select id="user" name="user" class="form-control" onchange="change_login(this);">
                        <option value="">[empty]</option>
                        @foreach ($accounts as $account)
                        <option value="{{ $account->email }}:{{ $account->password }}">
                            {{ $account->id }}:{{ $account->type }}:{{ $account->email }}
                        </option>
                        @endforeach
                    </select>
                </td>
            </tr>
            <tr>
                <th></th>
                <td></td>
                <td><textarea id="content" name="content" rows=26 cols=55 class="form-control"></textarea></td>
            </tr>
            <tr>
                <td></td>
                <td>&nbsp;&nbsp;</td>
                <td>
                    <button class="btn btn-primary" onclick="send()">Send...</button>
                    <button class="btn btn-default" onclick="pretty()">Pretty</button>
                    <div class="alert alert-info">
                        <strong>Info:</strong> Press CTRL + Enter to send query under caret or click on "Send..."
                    </div>
                </td>
            </tr>
        </table>
        </td>
        <td class="output"><iframe id="output" class="output"></iframe></td>
        </tr></table>
        <script type="text/javascript">
            var iframe = $("#output")[0];

            iframe = iframe.contentWindow ||
                iframe.contentDocument ||
                iframe.contentDocument.document;

            function write_output(str) {
                var defaultContent =
                    "<html><head>" +
                    "<link href='css/roboto.css' rel='stylesheet'>" +
                    "<style>body{font-family:'Roboto',sans-serif;}</style>" +
                    "</head>";
                iframe.document.open();
                iframe.document.write(defaultContent + str);
                iframe.document.close();
            }

            function send_request(request) {
                write_output("");
                $.ajax({
                    async: false,
                    url: request.url,
                    type: request.method,
                    dataType: 'json',
                    contentType: "application/json",
                    complete: function (xhr, textState) {
                        var output =
                            request.url +
                            "<br><b>response with " + xhr.status + "</b><hr>";
                        if (xhr.responseJSON) {
                            output += "<pre>" + JSON.stringify(xhr.responseJSON, null, 2) + "</pre>";
                        } else {
                            output += xhr.responseText;
                        }
                        write_output(output);
                    },
                    data: request.json
                });
            }

            function change_login(element) {
                send_request({
                    url: "logout",
                    method: "put",
                    json: ""
                });
                if (element.value != "") {
                    var emailpassword = element.value.split(":");

                    send_request({
                        url: "login",
                        method: "put",
                        json: JSON.stringify({
                            "email": emailpassword[0],
                            "password": "clearTextPassword"
                        })
                    });
                }
            }

            function parse(text) {
                var lines = text.split(";");
                var requests = [];

                lines.forEach(function(line) {
                    var line = line.trim();
                    if (line) {
                        requests.push(
                            parse_request(line)
                        );
                    }
                });
                return requests;
            }

            function parse_request(line) {
                console.log(line);
                var colon = line.indexOf(":");
                var angle = line.indexOf("{", colon+1);
                var square = line.indexOf("[", colon+1);

                angle = angle == -1 ? line.length : angle;
                square = square == -1 ? line.length : square;

                var lastIndex = Math.min(angle, square);

                if (colon == -1 || lastIndex == -1 || colon == lastIndex) {
                    throw "Format: method:url [json]"
                }

                var result = {
                    method: line.substring(0, colon).trim(),
                    url: line.substring(colon+1, lastIndex).trim(),
                    json: line.substring(lastIndex).trim(),
                };

                return result;
            }

            function request_render(request) {
                var result = request.method + ":" +
                             request.url;

                if (request.json) {
                    result += " " + JSON.stringify(
                        JSON.parse(request.json),
                        null,
                        2
                    );
                }

                result += ";\n";
                return result;
            }

            function pretty() {
                var textarea = $("#content").get(0);
                var requests = parse(textarea.value);

                var content = "";
                requests.forEach(function(request) {
                    content += request_render(request);
                });

                textarea.value = content;
            }

            function send() {
                var textarea = $("#content").get(0);
                var startIndex = textarea.selectionStart;
                var value = textarea.value;

                var from = value.lastIndexOf(";", startIndex-1);
                var to = value.indexOf(";", startIndex);

                to = to == -1 ? value.length : to;

                if (from < to) {
                    var line = value.substring(from+1, to).trim();
                    if (line) {
                        send_request(
                            parse_request(line)
                        );
                    }
                }
            }

            $("#content").on("keypress", function(e) {
                // CTRL + Enter
                if (e.ctrlKey && (e.which === 13)) {
                    send();
                }
            });

            var requests = [
                { method: "put"  , url: "login"     , json: { email: "", password: "" } },
                { method: "put"  , url: "reset"     , json: { email: ""               } },
                { method: "put"  , url: "logout"    , json: null                        },
                { method: "post" , url: "register"  , json: { email: "", password: "" } },
                { method: "get"  , url: "docents"   , json: null                        },
                { method: "get"  , url: "docents/3" , json: null                        },
                { method: "get"  , url: "settings"  , json: null                        },
            ];

            var result = "";
            requests.forEach(function(request) {
                if (request.json) {
                    request.json = JSON.stringify(
                        request.json, null, 2
                    );
                } else {
                    request.json = "";
                }

                result += request_render(request);
            });
            $("#content").text(result);
        </script>
    </body>
</html>

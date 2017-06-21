<!DOCTYPE html>
<html lang="en">
    <head>
        <link href="bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
        <link href="bower_components/bootstrap/dist/css/bootstrap-theme.css" rel="stylesheet">

        <script src="bower_components/jquery/dist/jquery.min.js"></script>
        <script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

        <style>
            select:-moz-focusring {
                color: transparent;
                text-shadow: 0 0 0 #000;
            }
            table.layout { height: 100% }
            td.form { width: 50%; }
            td { padding: 1px; }
            th { vertical-align: middle; }
            td.output { width: 100%; height: 100%; }
            #output {
                border: 1px solid lightgrey;
                width: 100%;
                height: 100%;
                margin-left: 5px
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
                        <option value="">no user</option>
                        @foreach ($accounts as $account)
                        <option value="{{ $account->email }}:{{ $account->password }}">
                            {{ $account->id }}:{{ $account->type }}:{{ $account->email }}
                        </option>
                        @endforeach
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="method">Method</label></th>
                <td></td>
                <td>
                    <select id="method" name="method" class="form-control">
                        <option>PUT</option>
                        <option>POST</option>
                        <option>DELETE</option>
                        <option>GET</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th><label for="url">Url</label></th>
                <td></td>
                <td> <input id="url" name="url" value="" class="form-control"> </td>
            </tr>
            <tr>
                <th><label for="content">Content</label></th>
                <td></td>
                <td> <textarea id="content" name="content" rows=25 cols=55 class="form-control"></textarea> </td>
            </tr>
            <tr>
                <td></td>
                <td>&nbsp;&nbsp;</td>
                <td>
                    <button class="btn btn-primary" id="send" onclick="send()">Send..</button>
                    <button class="btn btn-default" id="pretty" onclick="pretty()">Pretty</button>
                </td>
            </tr>
        </table>
        </td>
        <td class="output"><iframe id="output"></iframe></td>
        </tr></table>
        <script type="text/javascript">
            var iframe = $("#output")[0];

            iframe = iframe.contentWindow ||
                iframe.contentDocument ||
                iframe.contentDocument.document;

            function write_output(str) {
                iframe.document.open();
                iframe.document.write(str);
                iframe.document.close();
            }

            function request(url, method, content) {
                console.log(content);
                $.ajax({
                    url: url,
                    type: method,
                    dataType: 'json',
                    contentType: "application/json",
                    error: function (xhr, state, exception) {
                        write_output(url + "<br><b>response with " + xhr.status + "</b><hr>" + xhr.responseText);
                    },
                    success: function (data) {
                        write_output(
                            url + "<br><b>json response with 200</b><hr>" +
                            "<pre>" + JSON.stringify(data, null, 2) + "</pre>"
                        );
                    },
                    data: content
                });
            }

            function change_login(element) {
                request("logout", "post", []);
                if (element.value != "") {
                    var emailpassword = element.value.split(":")
                    request("login", "post", JSON.stringify({
                        "email": emailpassword[0],
                        "password": "clearTextPassword"
                    }));
                }
            }

            function pretty() {
                var content = $("#content")[0];

                try {
                    json = JSON.parse(content.value);
                } catch(err) {
                    console.log(err);
                    write_output(err.message);
                    throw err;
                }

                content.value = JSON.stringify(json, null, 2);
            }

            function send() {
                var method = $("#method")[0].value;
                var url = $("#url")[0].value;
                var content = $("#content")[0].value;

                write_output("");

                if (content != "") {
                    try {
                        JSON.parse(content);
                    } catch(err) {
                        write_output(err.message + "");
                        throw err;
                    }
                }

                request(url, method, content);
            }
        </script>
    </body>
</html>

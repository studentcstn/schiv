<html>
    <head>
        <style>
            table.layout { height: 100% }
            table.layout td {vertical-align: top }
            td.output { width:100%;height:100% }
            #output { width: 100%; height: 100% }
            #output { border: 1px solid black }
        </style>
    </head>
    <body>
        <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
        <table class="layout"><tr><td>
        <table>
            <tr>
                <td> <label for="user">Login</label> </td>
                <td></td>
                <td>
                    <select id="user" name="user" onchange="change_login(this);">
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
                <td> <label for="method">Method</label> </td>
                <td></td>
                <td>
                    <select id="method" name="method" >
                        <option>PUT</option>
                        <option>POST</option>
                        <option>DELETE</option>
                        <option>GET</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td> <label for="url">Url</label> </td>
                <td></td>
                <td> <input id="url" name="url" value=""> </td>
            </tr>
            <tr>
                <td> <label for="content">Content</label> </td>
                <td></td>
                <td> <textarea id="content" name="content" rows=25 cols=55></textarea> </td>
            </tr>
            <tr>
                <td></td>
                <td>&nbsp;&nbsp;</td>
                <td>
                    <input type="button" id="send" value="Send..." onclick="send()">
                    <input type="button" id="pretty" value="Pretty" onclick="pretty()">
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

// Version for TS distribution

export class YendSDKService {

  public user: any;
  public currentURL: string = '//yas.ninja';

  get(url: string, callback: (result: string) => void) {
    var http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        callback(http.responseText);
      }
    }
  };

  authenticatedGet(options: any) {
    options.callback = options.callback || function () { };
    options.url = options.url || '';
    options.query = options.query || {};

    const queryResult = '?token=' + localStorage['__yend-token'] + '&' + this.serialize(options.query);

    var http = new XMLHttpRequest();
    http.open("GET", options.url + queryResult);
    http.send();

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        options.callback(JSON.parse(http.responseText));
      }
    }
  };

  serialize(obj: any) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  // Auth tools
  checkLoginStatus(callback: (result: any) => void) {

    var token = localStorage['__yend-token'];
    if (token === undefined || token === null || token === '') {
      callback({ accepted: false });
    } else {
      this.get('//yas.ninja/api/token_check?token=' + token, function (result) {
        callback(JSON.parse(result));
      });
    }

  };

  loginAttempt(callback: (result: string) => void) {
    var username = prompt('username');
    var password = prompt('password');

    this.get('//yas.ninja/api/login?username=' + username + '&password=' + password, function (result) {
      callback(JSON.parse(result));
    });
  };

  attemptToLogin(options: any) {
    options.callback = options.callback || function () { };

    if (options.username && options.password) {
      this.get('//yas.ninja/api/login?username=' + options.username + '&password=' + options.password, (result: any) => {
        options.callback(JSON.parse(result));
        if (result.accepted) {
          if (result.token) {
            localStorage['__yend-token'] = result.token;
            options.callback(result);
          } else {
            options.callback(result);
          }
        } else {
          options.callback(result);
        }
      });
    } else {
      throw Error('Few args');
    }
  };

  autoLogin(callback: any, loginOnFail: any) {
    callback = callback || function () { };

    this.checkLoginStatus(
      (status: any) => {
        // token denied or does not exist
        if (status.accepted === false) {
          if (loginOnFail) {
            this.loginAttempt((result: any) => {
              if (result.token) {
                localStorage['__yend-token'] = result.token;
                callback({ ...result, accepted: true });
              } else {
                callback({ ...result, accepted: false });
              }
            });
          } else {
            callback(status);
          }

        } else {
          callback(status);
        }
      }
    );

  };

  //

  runCommandAsync(command: string, options: any = {}) {
    return new Promise((resolve, reject) => {
      this.authenticatedGet({
        url: this.currentURL + '/api/bash',
        query: {
          command: command,
          ...options
        },
        callback: (result: any) => { resolve(result); }
      });
    });
  }

  textToHTML(text: string) {
    return text
      .replace(/\n/g, '<br>')
      .replace(/ /g, '&nbsp;');
  }

  // 

  mapHostToUrl(host: string) {
    switch (host) {
      case 'this':
        return '//yas.ninja';
      case 'oracle':
        return '//yoracle.duckdns.org';
      case 'home':
        return '//ystorage.duckdns.org';
      case 'adev':
        return '//adev.duckdns.org';
    }

    return '';
  }

}

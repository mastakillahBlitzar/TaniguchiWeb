var myApp = angular.module('myApp');


myApp.controller('loginController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.login = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        AuthService.login($scope.user.email, $scope.user.password)
          // handle success  
          .then(function () {
            $location.path('/adminprofile');
            $scope.disabled = false;
            $scope.user = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });

      };

    }]);

myApp.controller('logoutController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.logout = function () {

        // call logout from service
        AuthService.logout()
          .then(function () {
            $location.path('/login');
          });

      };

    }]);

myApp.controller('registerController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      $scope.register = function () {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
          // handle success
          .then(function () {
            $location.path('/login');
            $scope.disabled = false;
            $scope.registerForm = {};
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Something went wrong!";
            $scope.disabled = false;
            $scope.registerForm = {};
          });

      };

    }]);

myApp.controller('ArticleDetailController',
  ['$scope', '$routeParams', '$location', 'ArticleService',
    function ($scope, $routeParams, $location, ArticleService) {

      var id = $routeParams._id;

      if (id !== "null") {
        $scope.isEdit = true;
        //TODO: llamar metodo que trae el articulo por el atributo id
        ArticleService.getOneArticle(id)
          .then(function (data) {
            $scope.article = data;
          })
          .catch(function () {
            $scope.error = "error en el servidor, intente recargar la pagina de nuevo";
          });
      } else {
        $scope.isEdit = false;
      }

      $scope.labels = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' }
      ];

      $scope.addArticle = function () {

        $scope.submitted = true;

        var title = $scope.article.title;
        var content = $scope.article.content;
        var pictures = $scope.article.pictures;

        ArticleService.addArticle(title, content, pictures)

          .then(function (response) {
            if (response.status === 200) {
              $scope.articleForm.$setPristine();
              $scope.article = {};
              $location
                .path('/table')
                .search({
                  param: 'All good, is added!'
                });
            } else {
              $scope.error = true;
              $scope.errorMessage = "Something went wrong!";
            }
          })
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Something went wrong!";
          });
      };

      $scope.updateArticle = function (article) {
        ArticleService.updateArticle(article._id, article)
          .then(function (response) {
            if (response.status === 200) {
              $scope.article = {};
              $location
                .path('/table')
                .search({
                  param: 'All good, is edited!'
                });
            } else {
              $scope.errorMessage = "Ops!, something went wrong";
            }
          })
          .catch(function () {
            $scope.errorMessage = "Ops!, something went wrong";
          });
      };


    }]);

myApp.controller('ArticleController',
  ['$scope', '$location', '$routeParams', 'ArticleService',
    function ($scope, $location, $routeParams, ArticleService) {

      refresh();
      /* obtain param from url */
      $scope.outputMsg = $routeParams.param;

      $scope.redirectToForm = function (id) {
        var _id = id;
        $location.path('/forms/' + _id);
      };

      $scope.remove = function (id) {
        ArticleService.deleteArticle(id)
          .then(function () {
            refresh();
          });
      };

      function refresh() {
        ArticleService.getArticles()

          .then(function (data) {
            $scope.articleList = data;
          })
          .catch(function () {

          });
      }
    }]);


myApp.controller('HomeNewsController',
  ['$scope', 'ArticleService',
    function ($scope, ArticleService) {
      refresh();

      var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

      function refresh() {
        ArticleService.getArticles()

          .then(function (data) {
            //
            data.forEach(function (element) {
              //split the string
              var dateArray = element.date.split("-");
              //extract the month from the resulting array
              var currentMonth = dateArray[1];
              var month = months[currentMonth - 1];
              //get day
              var dayArray = dateArray[2].split("T");
              day = dayArray[0];

              element.daymonth = day.concat(" ").concat(month);
            });
            $scope.articleList = data;

          })
          .catch(function () {

          });
      }

      $scope.readMoreClicked = function (index) {
        $('.slider').bxSlider();
      };
      
    }]);

myApp.controller('redirectController',
  ['$scope', '$location',
    function ($scope, $location) {
      $scope.home = function () {
        $location.path('/home');
      };

      $scope.services = function () {
        $location.path('/business');
      };

      $scope.company = function () {
        $location.path('/company');
      };

      $scope.contact = function () {
        $location.path('/contact');
      };

    }]);

myApp.controller('mpHeaderController',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.openNewTabLoc = function () {
        ActionService.openNewTabLoc($window);
      };

    }]);

myApp.controller('mpFooterController',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.openNewTabLoc = function () {
        ActionService.openNewTabLoc($window);
      };

    }]);

myApp.controller('gsContactFormCtrl',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.sendContactForm = function (msg) {
        var email = "juano.diy@gmail.com";
        var message = msg;
        ActionService.sendEmail(message, email)
          .then(function (res) {
            if (res.status === 200) {
              $scope.gsContactForm.$setPristine();
              $scope.gscontact = {};
            }
            $scope.message = res.data.status;
          });
      };

    }]);

myApp.controller('OwnersPgCtrl',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {

      $scope.ownersInfo = [
        {
          id: '1',
          msg: '空室ばかり、入居者とのトラブルばかり、雑草などで荒れ放題、等々ではせっかくの大切なご資産がもったいないです。オーナー様お一人では手に負えないことを私たちにお任せください！ ～入居者様に対しては末永く心地よくお住まい頂くために、オーナー様に対しては様々な煩わしさから開放され安心して物件をおまかせ頂くために、私たちがいます～もちろん、新規入居者募集および賃貸借契約締結の仲介業務のみも承ります。費用・詳細等についてはお気軽にお問い合わせください。'
        }
      ];

      $scope.reviews = [
        {
          houseImgPath: '../R/gsreviewers/mg_property.jpg',
          reviewerPath: '../R/gsreviewers/mg.jpg',
          title: '栗山市在住　M.G.様',
          text: '初めての不動産から谷口総合サービスさんにお世話になっております。もう長いお付き合いになりますが、管理していただいて一度も困った事はありません。滝川市では一番の不動産屋さんです。'
        },
        {
          houseImgPath: '../R/gsreviewers/tn_property.jpg',
          reviewerPath: '../R/gsreviewers/tn.jpg',
          title: '滝川市在住　T.N.様',
          text: '谷口総合サービス　最高です！<br> 仕事柄、国内外の移動が多くなかなか物件管理が難しく、アパート経営を始めた当初から入居者募集及び家賃管理、物件の管理までお願いしておりますが、今まで何の問題もなく、逆に自社物件かのように大切に管理していただいて、大変感謝しております。これからも、賃貸物件を増やすことがあれば、もちろん谷口総合サービスだと決めております。<br>滝川市での賃貸物件の管理は谷口総合サービスがお勧めです。'
        },
        {
          houseImgPath: '../R/gsreviewers/yu_property.jpg',
          reviewerPath: '../R/gsreviewers/yu.jpg',
          title: '滝川市在住　Y.U.様',
          text: '自営の仕事が忙しく、またアパート経営に関しては素人なので管理をやってもらって助かってます。'
        },
      ];

    }]);

myApp.controller('GsHomeCtrl',
  ['$scope', '$window', 'ActionService',
    function ($scope, $window, ActionService) {


    }]);

myApp.controller('mpAddressCtrl',
  ['$scope', '$window',
    function ($scope, $window) {

      $scope.infoCompany = [
        {
          icon: '../R/contacticons/1.png',
          infoName: '商号',
          infoDesc: ['有限会社谷口板金工業所']
        },
        {
          icon: '../R/contacticons/2.png',
          infoName: '創業',
          infoDesc: ['昭和36年4月']
        },
        {
          icon: '../R/contacticons/1.png',
          infoName: '設立',
          infoDesc: ['昭和47年7月']
        },
        {
          icon: '../R/contacticons/4.png',
          infoName: '建築業登録',
          infoDesc: ['北海道知事許可（般-26）第01221号']
        },
        {
          icon: '../R/contacticons/5.png',
          infoName: '資本金',
          infoDesc: ['2300万円']
        },
        {
          icon: '../R/contacticons/6.png',
          infoName: '代表取締役',
          infoDesc: ['谷口　正樹']
        },
        {
          icon: '../R/contacticons/7.png',
          infoName: '役員',
          infoDesc: [
            '専務取締役　1名',
            '常務取締役　2名',
            '取締役　2名'
          ] 
        },
        {
          icon: '../R/contacticons/8.png',
          infoName: '従業員数',
          infoDesc: ['27名（平成29年5月現在）']
        },
        {
          icon: '../R/contacticons/9.png',
          infoName: '技術者',
          infoDesc: [
            '1級建築士　1名',
            '2級建築士 2名',
            '金属屋根工事技師　3名',
            '1級建築板金技能士　4名',
            '2級建築板金技能士 6名',
            '1級建築施工管理技士　1名',
            '2級建築施工管理技士（躯体）　1名',
            '2級建築施工管理技士（仕上げ）　1名',
            '基幹技能者　1名'
          ] 
        },
      ];

      $scope.addresses = [
        {
          addressName: '本社',
          address: '北海道滝川市本町2丁目3番5号　ＴＳビル1階',
          num: '0125-23-3725',
          fax: '0125-23-2250',
        },
        {
          addressName: '札幌営業所',
          address: '北海道札幌市中央区北1条西15丁目1番3号　大通りハイム603号室',
          num: ' 011-632-7600',
          fax: ' 011-632-7608',
        },
        {
          addressName: '北関東営業所',
          address: '茨城県水戸市城南2丁目4番28号',
          num: ' 029-229-2580',
          fax: '029-229-2581',
        },
        {
          addressName: '芦別営業所',
          address: '北海道芦別市本町1053番地',
          num: '0124-23-3725',
          fax: 'FAX or alternative number',
        },
        {
          addressName: '工場',
          address: '北海道滝川市幸町3丁目4番18号',
          num: '0125-23-1013',
          fax: '0125-23-1013',
        },
      ];

    }]);
var myApp = angular.module('myApp');

myApp.controller('mpHomeController',
  ['$scope', '$location', '$window', '$routeParams', 'ArticleService', 'smoothScrollService', 'Lightbox',
    ($scope, $location, $window, $routeParams, ArticleService, $smoothScrollService, Lightbox) => {
      refresh();

      var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

      function refresh() {
        ArticleService.getArticles()
          .then((data) => {
            data.forEach((element) => {
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
            data.forEach(() => {
              console.log(data);
            });
            console.log($scope.articleList);
          })
          .catch((err) => {
            console.log(JSON.stringify(err));
          });
      }

      $scope.readMoreClicked = (index) => {
        $('.slider').bxSlider();
      };

      $scope.scrollToHash = () => {
        if ($routeParams.scrollTo) {
          $location.hash($routeParams.scrollTo);
          $smoothScrollService.scrollTo($routeParams.scrollTo);
        } else {
          $window.scrollTo(0, 0);
        }
      };

      $scope.scrollTo = (id) => {
        $location.hash(id);
        $smoothScrollService.scrollTo(id);
      };

      $scope.redirectTo = (page) => {
        $location.path(page);
      };

      $scope.openLightBoxModal = function (index) {
        $scope.images = $scope.articleList[index].pictures.map((e) => {
          console.log(e);
          return {
            url: e.url,
            caption: e.description
          };
        });
        console.log($scope.images);
        Lightbox.openModal($scope.images, 0);
      };

    }]);

myApp.controller('businessCtrl',
  ['$scope', '$location', '$window',
    ($scope, $location, $window) => {

      $scope.actionInit = function () {
        $window.scrollTo(0, 0);
      };

    }]);

myApp.controller('businessMainCtrl',
  ['$scope', '$location',
    ($scope, $location) => {

      $scope.servicesArray = [
        {
          serviceName: 'JFE鋼板 株式会社',
          serviceInfo: [
            'JFE GLカラー鋼板'
          ]
        },
        {
          serviceName: '株式会社 淀川製作所',
          serviceInfo: [
            'ヨドGLカラー鋼板',
            'ヨドルーフ'
          ]
        },
        {
          serviceName: '日新製鋼 株式会社',
          serviceInfo: [
            '月星GLカラー'
          ]
        },
        {
          serviceName: '株式会社 アイジー工業',
          serviceInfo: [
            'アイジーヴァンド'
          ]
        },
        {
          serviceName: 'ロンシール工業 株式会社',
          serviceInfo: [
            'ベストプルーフ'
          ]
        },
      ];
    }]);


myApp.controller('redirectController',
  ['$scope', '$location',
    ($scope, $location) => {
      $scope.home = () => {
        $location.path('/home');
      };

      $scope.services = () => {
        $location.path('/business');
      };

      $scope.company = () => {
        $location.path('/company');
      };

      $scope.contact = () => {
        $location.path('/contact');
      };

    }]);

myApp.controller('mpHeaderController',
  ['$scope', '$window', 'ActionService',
    ($scope, $window, ActionService) => {

      $scope.openNewTabLoc = () => {
        ActionService.openNewTabLoc($window);
      };

    }]);

myApp.controller('mpMenuController',
  ['$scope', '$location', 'smoothScrollService',
    ($scope, $location, $smoothScrollService) => {

      $scope.scrollTo = (id) => {
        let i = '#'.concat(id);
        // if element exists
        if (angular.element(i).length) {
          $location.hash(id);
          console.log(id);
          $smoothScrollService.scrollTo(id);
        } else {
          $location.path('/metalplatehome#mp-news');
        }
      };

    }]);




myApp.controller('mpFooterController',
  ['$scope', '$window', '$location', 'smoothScrollService', 'ActionService',
    ($scope, $window, $location, $smoothScrollService, ActionService) => {

      $scope.openNewTabLoc = () => {
        ActionService.openNewTabLoc($window);
      };

      $scope.class1 = null;
      $scope.class2 = null;
      $scope.toggleFooter = (option) => {
        if (option === 1) {
          toggleClass1();
        } else {
          toggleClass2();
        }
      };

      toggleClass1 = () => {
        if ($scope.class1 === null) {
          $scope.class1 = 'active';
        } else {
          $scope.class1 = null;
        }
      };

      toggleClass2 = () => {
        if ($scope.class2 === null) {
          $scope.class2 = 'active';
        } else {
          $scope.class2 = null;
        }
      };

      $scope.scrollTo = (id) => {
        let i = '#'.concat(id);
        // if element exists
        if (angular.element(i).length) {
          $location.hash(id);
          console.log(id);
          $smoothScrollService.scrollTo(id);
        } else {
          $location.path('/metalplatehome#mp-news');
        }
      };

    }]);

myApp.controller('mpFormCtrl',
  ['$scope', '$window', 'ActionService',
    ($scope, $window, ActionService) => {

      $scope.sendContactForm = (msg) => {
        var email = "juano.diy@gmail.com";
        var message = msg;
        ActionService.sendEmail(message, email)
          .then((res) => {
            if (res.status === 200) {
              $scope.gsContactForm.$setPristine();
              $scope.gscontact = {};
            }
            $scope.message = res.data.status;
          });
      };

    }]);




myApp.controller('mpCompanyCtrl',
  ['$scope', '$location', '$window',
    function ($scope, $location, $window) {
      $scope.actionInit = function () {
        console.log('I\'m here');
        console.log($window);
        $window.scrollTo(0, 0);
      };
    }]);

myApp.controller('mpAddressCtrl',
  ['$scope',
    ($scope) => {

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

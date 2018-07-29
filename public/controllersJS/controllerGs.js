var myApp = angular.module('myApp');

myApp.controller('gsHeaderController',
  ['$scope', '$window', 'ActionService',
    ($scope, $window, ActionService) => {

      $scope.openNewTabLoc = () => {
        ActionService.openNewTabLoc($window);
      };

    }]);

    myApp.controller('CompanyPgCtrl',
  ['$scope', '$window',
    ($scope, $window) => {
      $scope.gsInfo = [
        {
          name: '商号',
          desc: [
            '有限会社谷口総合サービス'
          ]
        },
        {
          name: '設立',
          desc: [
            '平成13年3月'
          ]
        },
        {
          name: '免許等',
          desc: [
            '宅地建物取引業免許　北海道知事　空知（3）第474号',
            '賃貸住宅 管理業者登録　国土交通大臣（2）第1168号',
            '全国賃貸不動産管理業協会　会員番号　05949'
          ]
        },
        {
          name: '所属団体',
          desc: [
            '（公社）北海道宅地建物取引業協会'
          ]
        },
        {
          name: '資本金',
          desc: [
            '300万円'
          ]
        },
        {
          name: '代表取締役',
          desc: [
            '谷口　正樹'
          ]
        },
        {
          name: '従業員数',
          desc: [
            '3名（平成27年2月現在）'
          ]
        },
        {
          name: '所在地',
          desc: [
            '〒073-0021',
            '北海道滝川市本町2丁目3番5号 TSビル1階',
            '→アクセス',
            'TEL. 0125-23-8170',
            'FAX. 0125-23-2250'
          ]
        },
        {
          name: '定休日',
          desc: [
            '日曜、祝日（3月は無休）、年末年始、お盆'
          ]
        },
        {
          name: '営業時間',
          desc: [
            '9：00～17：00',
            '定休日および時間外も可能な限り対応いたします。事前にご連絡下さい !!'
          ]
        },
      ];
    }]);

    myApp.controller('OwnersPgCtrl',
  ['$scope', '$window', 'ActionService',
    ($scope, $window, ActionService) => {

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

    myApp.controller('gsFooterController',
  ['$scope', '$window', 'ActionService',
    ($scope, $window, ActionService) => {

      $scope.openNewTabLoc = () => {
        ActionService.openNewTabLoc($window);
      };

    }]);


    myApp.controller('gsContactFormCtrl',
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

    myApp.controller('gsNewsCtrl',
  ['$scope', '$window', 'NewsService',
    ($scope, $window, NewsService) => {
      refresh();
      $scope.text = 'Hello from controller!';

      var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    function refresh() {
      NewsService.getArticles()
        .then((data) => {
          data.forEach((element) => {
            //split the string
            var dateArray = element.date.split("-");
            //extract the month from the resulting array
            var year = dateArray[0];
            var currentMonth = dateArray[1];
            var month = months[currentMonth - 1];
            //get day
            var dayArray = dateArray[2].split("T");
            day = dayArray[0];

            element.daymonth = `${day} ${month} ${year}`;
          });
          $scope.newsList = data;
          data.forEach(() => {
            console.log(data);
          });
          console.log($scope.newsList);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    }
    }]);

    
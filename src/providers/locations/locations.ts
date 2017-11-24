import { Injectable } from '@angular/core';

/*
  Generated class for the LocationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationsProvider {
    public Locations = [{
        "id": 1,
        "latitude": 43.022139,
        "longitude": 141.322111,
        "description": "もいわ山の標高は531ｍ。決して高くないものの北海道自然100選に選ばれた美しい山です。",
        "name": "藻岩山",
        "img": "moiwa.png"
    },
    {
        "id": 2,
        "latitude": 43.061092,
        "longitude": 141.356433,
        "description": "地上90.38mの展望台へは3階よりエレベーターで約60秒。眼下には、四季折々の花が咲く大通公園と遠くの日本海や、雄大な石狩平野などを背景に、札幌市全域が広がります。また、ホワイトイルミネーションやさっぽろ雪まつり、YOSAKOIソーラン祭りなどのイベントも一望できます。",
        "name": "さっぽろテレビ塔",
        "img": "tv.png"
    },
    {
        "id": 3,
        "latitude": 43.063944,
        "longitude": 141.348,
        "description": "札幌の北3条通から西方面を望むと、突き当たりに堂々とした姿の北海道庁旧本庁舎が見える。「赤れんが庁舎」の愛称で知られる煉瓦づくりの建物だ。",
        "name": "赤れんが庁舎",
        "img": "redbrick.png"
    },
    {
        "id": 4,
        "latitude": 43.1225,
        "longitude": 141.431111,
        "description": "札幌市の市街地を公園や緑地の帯で包み込もうという「環状グリーンベルト構想」における北東部緑地ゾーンの拠点として計画された総合公園。1982年（昭和57年）着工後、2005年（平成17年）にグランドオープンした。基本設計は彫刻家のイサム・ノグチが手がけ、「全体をひとつの彫刻作品とする」というコンセプトのもと造成が進められた。",
        "name": "モエレ沼公園",
        "img": "moirenuma.png"
    },
    {
        "id": 5,
        "latitude": 43.1175,
        "longitude": 141.381389,
        "description": "札幌飛行場は、陸上自衛隊の専用飛行場（軍用飛行場）であったが、1961年に公共用飛行場として指定と民間機の乗り入れが開始され、空港施設の名称から「丘珠空港」と通称されている。設置管理者は防衛省となっており、陸上自衛隊丘珠駐屯地との共用飛行場となっている。",
        "name": "丘珠空港",
        "img": "okadama.png"
    },
    {
        "id": 6,
        "latitude": 43.065556,
        "longitude": 141.363333,
        "description": "1876年（明治9年）操業の「開拓使麦酒醸造所」跡地であり、サッポロビールの「札幌第一工場」（札幌第1製造所）として1989年（平成元年）までビールを生産していたエリアを再開発して複合商業施設にした。高さ39 m、幅34 m、全長84 mある全天候型のアトリウムを中心にショッピングモール、アミューズメント施設、レストラン、フィットネスクラブ、ホテルなどの施設があり、それぞれの建物は連絡通路で接続している。",
        "name": "札幌ファクトリー",
        "img": "factory.png"
    },
    {
        "id": 7,
        "latitude": 43.115833,
        "longitude": 141.375,
        "description": "「札幌市スポーツ交流施設」の屋内施設であり、周辺には球技場、テニスコート、パークゴルフ場などの屋外施設も整備している[3]、1,200人の観客席を設けたアリーナには人工芝のグラウンドを設置しており、軟式野球やソフトボール、サッカー、各種レクリエーションやイベントなどに利用することができる。各種スポーツ教室を開催しているほか、高野進監修による『さっぽろ・アスレティクスアカデミー』（SPAA）実施会場にもなっている",
        "name": "札幌コミュニティドーム",
        "img": "tsudome.png"
    }
    ];

    constructor() {
        console.log('Hello LocationsProvider Provider');
    }

    getLocations(){
        return this.Locations;
    }
}

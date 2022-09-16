import GeoFilter from "../src/component/GeoFilter";

const geoFilter_01= {
    "region": {
      "center": {
        "latitude": -76.63581,
        "longitude": 21.37536
      },
      "radius": {
        "value": 300.0,
        "unit": "kilometers"
      }
    },
    "altitudeRange": {
      "min": 50,
      "max": 150,
      "unit": "kilometers"
    }};

const geoFilter_02=  {
    "region": {
      "vertices": [{
        "latitude": 41.9109,
        "longitude": 12.4818
      },
      {
        "latitude": 45.9109,
        "longitude": 12.4818
      },
      {
        "latitude": 41.9109,
        "longitude": 17.4818
      }
    ],
    "altitudeRange": {
      "min": 0,
      "max": 50,
      "unit": "kilometers"
    }
  }
};

const geoFilter_03= {
  "region": {
    "center": {
      "latitude":41.9109,
      "longitude": 12.4818
    },
    "radius": {
      "value": 50.0,
      "unit": "meters"
    }
  }};

describe('Testing GeoFilter', () => {
    describe('GeoFilter general', () => {

        it('Unit convertor, should convert other units to meter', async () => {
  
            const gf = new GeoFilter(geoFilter_01);
            expect(gf.convertUnitToMetersForm(0.001,"kilometers")).toBe(1);
            expect(gf.convertUnitToMetersForm(1,"meters")).toBe(1);
            expect(gf.convertUnitToMetersForm(1,"miles")).toBe(1609.344);
            expect(gf.convertUnitToMetersForm(5,"nauticalmiles")).toBe(9260);
            expect(gf.convertUnitToMetersForm(2,"inches")).toBe(0.0508001016002032);
           
        });
       
    });

    describe('Query with Polyngons', () => {
        it('Some point that should pass this Polyngons filter', async () => {
  
            const point1= [43.71972, 13.21858];
            const point2= [41.96728, 14.98338];
            const point3= [42.96896, 15.05491];
            const point4= [42.88042, 13.04152];
            const gf = new GeoFilter(geoFilter_02);
            
            //altitude 10m
            expect(gf.isInside(point1[0],point1[1],10)).toBeTruthy();
            expect(gf.isInside(point2[0],point2[1],10)).toBeTruthy();
            expect(gf.isInside(point3[0],point3[1],10)).toBeTruthy();
            expect(gf.isInside(point4[0],point4[1],10)).toBeTruthy();
         
            //altitude 49km
            expect(gf.isInside(point1[0],point1[1],4900)).toBeTruthy();
            expect(gf.isInside(point2[0],point2[1],4900)).toBeTruthy();
            expect(gf.isInside(point3[0],point3[1],4900)).toBeTruthy();
            expect(gf.isInside(point4[0],point4[1],4900)).toBeTruthy();
        });
        it('Some point that should NOT pass this Polyngons filter', async () => {
  
            //good points
            const point1= [43.71972, 13.21858];
            const point2= [41.96728, 14.98338];
            const point3= [42.96896, 15.05491];
            const point4= [42.88042, 13.04152];
            //bad points
            const point5= [41.39991, 14.70044];
            const point6= [45.63942, 20.80335];
            const point7= [37.45204, 176.79833];
            const point8= [40.19048, -175.81885];
            const gf = new GeoFilter(geoFilter_01);
            
            //wring altitude -1m
            expect(gf.isInside(point1[0],point1[1],-1)).toBeFalsy();
            expect(gf.isInside(point2[0],point2[1],-1)).toBeFalsy();
            expect(gf.isInside(point3[0],point3[1],-1)).toBeFalsy();
            expect(gf.isInside(point4[0],point4[1],-1)).toBeFalsy();
         
            //wrong altitude 51km
            expect(gf.isInside(point1[0],point1[1],5100)).toBeFalsy();
            expect(gf.isInside(point2[0],point2[1],5100)).toBeFalsy();
            expect(gf.isInside(point3[0],point3[1],5100)).toBeFalsy();
            expect(gf.isInside(point4[0],point4[1],5100)).toBeFalsy();

            //good altitude
            expect(gf.isInside(point5[0],point5[1],1000)).toBeFalsy();
            expect(gf.isInside(point6[0],point6[1],1000)).toBeFalsy();
            expect(gf.isInside(point7[0],point7[1],1000)).toBeFalsy();
            expect(gf.isInside(point8[0],point8[1],1000)).toBeFalsy();

        });
      
    });

    describe('Query on radius', () => {
        it('Some point that should pass this radius filter', async () => {
  
            const point1= [-76.63581, 21.37536];
            const point2= [-78.14951, 18.56286];
            const point3= [-75.95931, 23.7484];
            const point4= [-76.737, 16.9818];
            const gf = new GeoFilter(geoFilter_01);
            
            expect(gf.isInside(point1[0],point1[1],55000)).toBeTruthy();
            expect(gf.isInside(point2[0],point2[1],110000)).toBeTruthy();
            expect(gf.isInside(point3[0],point3[1],58000)).toBeTruthy();
            expect(gf.isInside(point4[0],point4[1],90000)).toBeTruthy();
         
        });
        it('Some point that should NOT pass this radius filter', async () => {
  
            //good points
            const point1= [-75.27165, 15.57458];
            const point2= [-78.14951, 18.56286];
            const point3= [-75.95931, 23.7484];
            const point4= [-76.737, 16.9818];
            //bad points
            const point5= [41.39991, 14.70044];
            const point6= [45.63942, 20.80335];
            const point7= [-73.05673, 39.78844];
            const point8= [-78.60106, 2.83044];
            const point9= [44.494884, 11.3426162];
            const gf = new GeoFilter(geoFilter_01);
            
            //wring altitude -1m
            expect(gf.isInside(point1[0],point1[1],-1)).toBeFalsy();
            expect(gf.isInside(point2[0],point2[1],-1)).toBeFalsy();
            expect(gf.isInside(point3[0],point3[1],-1)).toBeFalsy();
            expect(gf.isInside(point4[0],point4[1],-1)).toBeFalsy();
         
            //wrong altitude 500km
            expect(gf.isInside(point1[0],point1[1],500000)).toBeFalsy();
            expect(gf.isInside(point2[0],point2[1],500000)).toBeFalsy();
            expect(gf.isInside(point3[0],point3[1],500000)).toBeFalsy();
            expect(gf.isInside(point4[0],point4[1],500000)).toBeFalsy();

            //good altitude
            expect(gf.isInside(point5[0],point5[1],55000)).toBeFalsy();
            expect(gf.isInside(point6[0],point6[1],55000)).toBeFalsy();
            expect(gf.isInside(point7[0],point7[1],55000)).toBeFalsy();
            expect(gf.isInside(point8[0],point8[1],55000)).toBeFalsy();
            expect(gf.isInside(point9[0],point9[1],55000)).toBeFalsy();

        });

        it('Testing a realy small region filter', async () => {
  
          //good points
          const point1= [41.910911, 12.4818999];
          //bad points
          const point2= [44.494888, 11.3426163];
          const gf = new GeoFilter(geoFilter_03);
     
          expect(gf.isInside(point1[0],point1[1],null)).toBeTruthy();
          expect(gf.isInside(point2[0],point2[1],null)).toBeFalsy();

      });
      
    });
    
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnMicroservices = void 0;
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const constructs_1 = require("constructs");
const path_1 = require("path");
class SwnMicroservices extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // product microservices
        this.productMicroservice = this.createProductFunction(props.productTable);
        // basket microservices
        this.basketMicroservice = this.createBasketFunction(props.basketTable);
        // ordering Microservice
        this.orderingMicroservice = this.createOrderingFunction(props.orderTable);
    }
    createProductFunction(productTable) {
        const nodeJsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk'
                ]
            },
            environment: {
                PRIMARY_KEY: 'id',
                DYNAMODB_TABLE_NAME: productTable.tableName
            },
            runtime: aws_lambda_1.Runtime.NODEJS_14_X
        };
        // Product microservices lambda function
        const productFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'productLambdaFunction', {
            entry: path_1.join(__dirname, `/../src/product/index.js`),
            ...nodeJsFunctionProps,
        });
        productTable.grantReadWriteData(productFunction);
        return productFunction;
    }
    createBasketFunction(basketTable) {
        const basketFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk',
                ],
            },
            environment: {
                PRIMARY_KEY: 'userName',
                DYNAMODB_TABLE_NAME: basketTable.tableName,
                EVENT_SOURCE: "com.swn.basket.checkoutbasket",
                EVENT_DETAILTYPE: "CheckoutBasket",
                EVENT_BUSNAME: "SwnEventBus"
            },
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
        };
        const basketFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'basketLambdaFunction', {
            entry: path_1.join(__dirname, `/../src/basket/index.js`),
            ...basketFunctionProps,
        });
        basketTable.grantReadWriteData(basketFunction);
        return basketFunction;
    }
    createOrderingFunction(orderTable) {
        const nodeJsFunctionProps = {
            bundling: {
                externalModules: [
                    'aws-sdk',
                ],
            },
            environment: {
                PRIMARY_KEY: 'userName',
                SORT_KEY: 'orderDate',
                DYNAMODB_TABLE_NAME: orderTable.tableName,
            },
            runtime: aws_lambda_1.Runtime.NODEJS_14_X,
        };
        const orderFunction = new aws_lambda_nodejs_1.NodejsFunction(this, 'orderingLambdaFunction', {
            entry: path_1.join(__dirname, `/../src/ordering/index.js`),
            ...nodeJsFunctionProps,
        });
        orderTable.grantReadWriteData(orderFunction);
        return orderFunction;
    }
}
exports.SwnMicroservices = SwnMicroservices;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWljcm9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVEQUFpRDtBQUNqRCxxRUFBb0Y7QUFDcEYsMkNBQXVDO0FBQ3ZDLCtCQUE0QjtBQVE1QixNQUFhLGdCQUFpQixTQUFRLHNCQUFTO0lBTTdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBNEI7UUFDcEUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUUsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU8scUJBQXFCLENBQUMsWUFBb0I7UUFDaEQsTUFBTSxtQkFBbUIsR0FBd0I7WUFDL0MsUUFBUSxFQUFFO2dCQUNSLGVBQWUsRUFBRTtvQkFDZixTQUFTO2lCQUNWO2FBQ0Y7WUFDRCxXQUFXLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxTQUFTO2FBQzVDO1lBQ0QsT0FBTyxFQUFFLG9CQUFPLENBQUMsV0FBVztTQUM3QixDQUFBO1FBRUQsd0NBQXdDO1FBQ3hDLE1BQU0sZUFBZSxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDeEUsS0FBSyxFQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUsMEJBQTBCLENBQUM7WUFDbEQsR0FBRyxtQkFBbUI7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWpELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxXQUFtQjtRQUM5QyxNQUFNLG1CQUFtQixHQUF3QjtZQUMvQyxRQUFRLEVBQUU7Z0JBQ04sZUFBZSxFQUFFO29CQUNiLFNBQVM7aUJBQ1o7YUFDSjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQUUsVUFBVTtnQkFDdkIsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLFNBQVM7Z0JBQzFDLFlBQVksRUFBRSwrQkFBK0I7Z0JBQzdDLGdCQUFnQixFQUFFLGdCQUFnQjtnQkFDbEMsYUFBYSxFQUFFLGFBQWE7YUFDL0I7WUFDRCxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxXQUFXO1NBQzdCLENBQUE7UUFFRCxNQUFNLGNBQWMsR0FBRyxJQUFJLGtDQUFjLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ3RFLEtBQUssRUFBRSxXQUFJLENBQUMsU0FBUyxFQUFFLHlCQUF5QixDQUFDO1lBQ2pELEdBQUcsbUJBQW1CO1NBQ3ZCLENBQUMsQ0FBQztRQUVILFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvQyxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRU8sc0JBQXNCLENBQUMsVUFBa0I7UUFDL0MsTUFBTSxtQkFBbUIsR0FBd0I7WUFDN0MsUUFBUSxFQUFFO2dCQUNOLGVBQWUsRUFBRTtvQkFDYixTQUFTO2lCQUNaO2FBQ0o7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLFVBQVU7Z0JBQ3ZCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixtQkFBbUIsRUFBRSxVQUFVLENBQUMsU0FBUzthQUM1QztZQUNELE9BQU8sRUFBRSxvQkFBTyxDQUFDLFdBQVc7U0FDL0IsQ0FBQTtRQUVELE1BQU0sYUFBYSxHQUFHLElBQUksa0NBQWMsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDckUsS0FBSyxFQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUsMkJBQTJCLENBQUM7WUFDbkQsR0FBRyxtQkFBbUI7U0FDekIsQ0FBQyxDQUFDO1FBRUgsVUFBVSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7Q0FFRjtBQTVGRCw0Q0E0RkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJVGFibGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiXCI7XG5pbXBvcnQgeyBSdW50aW1lIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uLCBOb2RlanNGdW5jdGlvblByb3BzIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbmludGVyZmFjZSBTd25NaWNyb3NlcnZpY2VzUHJvcHMge1xuICAgIHByb2R1Y3RUYWJsZTogSVRhYmxlO1xuICAgIGJhc2tldFRhYmxlOiBJVGFibGU7XG4gICAgb3JkZXJUYWJsZTogSVRhYmxlO1xufVxuXG5leHBvcnQgY2xhc3MgU3duTWljcm9zZXJ2aWNlcyBleHRlbmRzIENvbnN0cnVjdCB7XG5cbiAgcHVibGljIHJlYWRvbmx5IHByb2R1Y3RNaWNyb3NlcnZpY2U6IE5vZGVqc0Z1bmN0aW9uO1xuICBwdWJsaWMgcmVhZG9ubHkgYmFza2V0TWljcm9zZXJ2aWNlOiBOb2RlanNGdW5jdGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IG9yZGVyaW5nTWljcm9zZXJ2aWNlOiBOb2RlanNGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3duTWljcm9zZXJ2aWNlc1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIC8vIHByb2R1Y3QgbWljcm9zZXJ2aWNlc1xuICAgIHRoaXMucHJvZHVjdE1pY3Jvc2VydmljZSA9IHRoaXMuY3JlYXRlUHJvZHVjdEZ1bmN0aW9uKHByb3BzLnByb2R1Y3RUYWJsZSk7XG4gICAgLy8gYmFza2V0IG1pY3Jvc2VydmljZXNcbiAgICB0aGlzLmJhc2tldE1pY3Jvc2VydmljZSA9IHRoaXMuY3JlYXRlQmFza2V0RnVuY3Rpb24ocHJvcHMuYmFza2V0VGFibGUpO1xuICAgIC8vIG9yZGVyaW5nIE1pY3Jvc2VydmljZVxuICAgIHRoaXMub3JkZXJpbmdNaWNyb3NlcnZpY2UgPSB0aGlzLmNyZWF0ZU9yZGVyaW5nRnVuY3Rpb24ocHJvcHMub3JkZXJUYWJsZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByb2R1Y3RGdW5jdGlvbihwcm9kdWN0VGFibGU6IElUYWJsZSkgOiBOb2RlanNGdW5jdGlvbiB7XG4gICAgY29uc3Qgbm9kZUpzRnVuY3Rpb25Qcm9wczogTm9kZWpzRnVuY3Rpb25Qcm9wcyA9IHtcbiAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgIGV4dGVybmFsTW9kdWxlczogW1xuICAgICAgICAgICdhd3Mtc2RrJ1xuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgUFJJTUFSWV9LRVk6ICdpZCcsXG4gICAgICAgIERZTkFNT0RCX1RBQkxFX05BTUU6IHByb2R1Y3RUYWJsZS50YWJsZU5hbWVcbiAgICAgIH0sXG4gICAgICBydW50aW1lOiBSdW50aW1lLk5PREVKU18xNF9YXG4gICAgfVxuXG4gICAgLy8gUHJvZHVjdCBtaWNyb3NlcnZpY2VzIGxhbWJkYSBmdW5jdGlvblxuICAgIGNvbnN0IHByb2R1Y3RGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAncHJvZHVjdExhbWJkYUZ1bmN0aW9uJywge1xuICAgICAgZW50cnk6IGpvaW4oX19kaXJuYW1lLCBgLy4uL3NyYy9wcm9kdWN0L2luZGV4LmpzYCksXG4gICAgICAuLi5ub2RlSnNGdW5jdGlvblByb3BzLFxuICAgIH0pO1xuXG4gICAgcHJvZHVjdFRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShwcm9kdWN0RnVuY3Rpb24pOyBcbiAgICBcbiAgICByZXR1cm4gcHJvZHVjdEZ1bmN0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVCYXNrZXRGdW5jdGlvbihiYXNrZXRUYWJsZTogSVRhYmxlKSA6IE5vZGVqc0Z1bmN0aW9uIHtcbiAgICBjb25zdCBiYXNrZXRGdW5jdGlvblByb3BzOiBOb2RlanNGdW5jdGlvblByb3BzID0ge1xuICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgICBleHRlcm5hbE1vZHVsZXM6IFtcbiAgICAgICAgICAgICAgJ2F3cy1zZGsnLCAvLyBVc2UgdGhlICdhd3Mtc2RrJyBhdmFpbGFibGUgaW4gdGhlIExhbWJkYSBydW50aW1lXG4gICAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgIFBSSU1BUllfS0VZOiAndXNlck5hbWUnLFxuICAgICAgICAgIERZTkFNT0RCX1RBQkxFX05BTUU6IGJhc2tldFRhYmxlLnRhYmxlTmFtZSxcbiAgICAgICAgICBFVkVOVF9TT1VSQ0U6IFwiY29tLnN3bi5iYXNrZXQuY2hlY2tvdXRiYXNrZXRcIixcbiAgICAgICAgICBFVkVOVF9ERVRBSUxUWVBFOiBcIkNoZWNrb3V0QmFza2V0XCIsXG4gICAgICAgICAgRVZFTlRfQlVTTkFNRTogXCJTd25FdmVudEJ1c1wiXG4gICAgICB9LFxuICAgICAgcnVudGltZTogUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICB9XG5cbiAgICBjb25zdCBiYXNrZXRGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnYmFza2V0TGFtYmRhRnVuY3Rpb24nLCB7XG4gICAgICBlbnRyeTogam9pbihfX2Rpcm5hbWUsIGAvLi4vc3JjL2Jhc2tldC9pbmRleC5qc2ApLFxuICAgICAgLi4uYmFza2V0RnVuY3Rpb25Qcm9wcyxcbiAgICB9KTtcblxuICAgIGJhc2tldFRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YShiYXNrZXRGdW5jdGlvbik7XG4gICAgcmV0dXJuIGJhc2tldEZ1bmN0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVPcmRlcmluZ0Z1bmN0aW9uKG9yZGVyVGFibGU6IElUYWJsZSkgOiBOb2RlanNGdW5jdGlvbiB7XG4gICAgY29uc3Qgbm9kZUpzRnVuY3Rpb25Qcm9wczogTm9kZWpzRnVuY3Rpb25Qcm9wcyA9IHtcbiAgICAgICAgYnVuZGxpbmc6IHtcbiAgICAgICAgICAgIGV4dGVybmFsTW9kdWxlczogW1xuICAgICAgICAgICAgICAgICdhd3Mtc2RrJywgLy8gVXNlIHRoZSAnYXdzLXNkaycgYXZhaWxhYmxlIGluIHRoZSBMYW1iZGEgcnVudGltZVxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSwgICAgICBcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICAgIFBSSU1BUllfS0VZOiAndXNlck5hbWUnLFxuICAgICAgICAgICAgU09SVF9LRVk6ICdvcmRlckRhdGUnLFxuICAgICAgICAgICAgRFlOQU1PREJfVEFCTEVfTkFNRTogb3JkZXJUYWJsZS50YWJsZU5hbWUsXG4gICAgICAgIH0sXG4gICAgICAgIHJ1bnRpbWU6IFJ1bnRpbWUuTk9ERUpTXzE0X1gsXG4gICAgfVxuXG4gICAgY29uc3Qgb3JkZXJGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbih0aGlzLCAnb3JkZXJpbmdMYW1iZGFGdW5jdGlvbicsIHtcbiAgICAgICAgZW50cnk6IGpvaW4oX19kaXJuYW1lLCBgLy4uL3NyYy9vcmRlcmluZy9pbmRleC5qc2ApLFxuICAgICAgICAuLi5ub2RlSnNGdW5jdGlvblByb3BzLFxuICAgIH0pO1xuXG4gICAgb3JkZXJUYWJsZS5ncmFudFJlYWRXcml0ZURhdGEob3JkZXJGdW5jdGlvbik7XG4gICAgcmV0dXJuIG9yZGVyRnVuY3Rpb247XG4gIH1cblxufSJdfQ==
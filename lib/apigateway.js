"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnApiGateway = void 0;
const aws_apigateway_1 = require("aws-cdk-lib/aws-apigateway");
const constructs_1 = require("constructs");
class SwnApiGateway extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // Product api gateway
        this.createProductApi(props.productMicroservice);
        // Basket api gateway
        this.createBasketApi(props.basketMicroservice);
        // Ordering api gateway
        this.createOrderApi(props.orderingMicroservices);
    }
    createProductApi(productMicroservice) {
        // Product microservices api gateway
        // root name = product
        // GET /product
        // POST /product
        // Single product with id parameter
        // GET /product/{id}
        // PUT /product/{id}
        // DELETE /product/{id}
        const apigw = new aws_apigateway_1.LambdaRestApi(this, 'productApi', {
            restApiName: 'Product Service',
            handler: productMicroservice,
            proxy: false
        });
        const product = apigw.root.addResource('product');
        product.addMethod('GET'); // GET /product
        product.addMethod('POST'); // POST /product
        const singleProduct = product.addResource('{id}'); // product/{id}
        singleProduct.addMethod('GET'); // GET /product/{id}
        singleProduct.addMethod('PUT'); // PUT /product/{id}
        singleProduct.addMethod('DELETE'); // DELETE /product/{id}
    }
    createBasketApi(basketMicroservice) {
        // Basket microservices api gateway
        // root name = basket
        // GET /basket
        // POST /basket
        // // Single basket with userName parameter - resource name = basket/{userName}
        // GET /basket/{userName}
        // DELETE /basket/{userName}
        // checkout basket async flow
        // POST /basket/checkout
        const apigw = new aws_apigateway_1.LambdaRestApi(this, 'basketApi', {
            restApiName: 'Basket Service',
            handler: basketMicroservice,
            proxy: false
        });
        const basket = apigw.root.addResource('basket');
        basket.addMethod('GET'); // GET /basket
        basket.addMethod('POST'); // POST /basket
        const singleBasket = basket.addResource('{userName}');
        singleBasket.addMethod('GET'); // GET /basket/{userName}
        singleBasket.addMethod('DELETE'); // DELETE /basket/{userName}
        const basketCheckout = basket.addResource('checkout');
        basketCheckout.addMethod('POST'); // POST /basket/checkout
        // expected request payload : { userName : swn }
    }
    createOrderApi(orderingMicroservices) {
        // Ordering microservices api gateway
        // root name = order
        // GET /order
        // GET /order/{userName}
        // expected request : xxx/order/swn?orderDate=timestamp
        // ordering ms grap input and query parameters and filter to dynamo db
        const apigw = new aws_apigateway_1.LambdaRestApi(this, 'orderApi', {
            restApiName: 'Order Service',
            handler: orderingMicroservices,
            proxy: false
        });
        const order = apigw.root.addResource('order');
        order.addMethod('GET'); // GET /order        
        const singleOrder = order.addResource('{userName}');
        singleOrder.addMethod('GET'); // GET /order/{userName}
        // expected request : xxx/order/swn?orderDate=timestamp
        // ordering ms grap input and query parameters and filter to dynamo db
        return singleOrder;
    }
}
exports.SwnApiGateway = SwnApiGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpZ2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwaWdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTJEO0FBRTNELDJDQUF1QztBQVF2QyxNQUFhLGFBQWMsU0FBUSxzQkFBUztJQUV4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXlCO1FBQy9ELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRCxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMvQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsbUJBQThCO1FBQ3JELG9DQUFvQztRQUNwQyxzQkFBc0I7UUFFdEIsZUFBZTtRQUNmLGdCQUFnQjtRQUVoQixtQ0FBbUM7UUFDbkMsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQix1QkFBdUI7UUFFdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSw4QkFBYSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDbEQsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGVBQWU7UUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFFLGdCQUFnQjtRQUU1QyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZTtRQUNsRSxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsb0JBQW9CO1FBQ3BELGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7UUFDcEQsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtJQUM1RCxDQUFDO0lBRU8sZUFBZSxDQUFDLGtCQUE2QjtRQUNqRCxtQ0FBbUM7UUFDbkMscUJBQXFCO1FBRXJCLGNBQWM7UUFDZCxlQUFlO1FBRWYsK0VBQStFO1FBQy9FLHlCQUF5QjtRQUN6Qiw0QkFBNEI7UUFFNUIsNkJBQTZCO1FBQzdCLHdCQUF3QjtRQUV4QixNQUFNLEtBQUssR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRTtZQUMvQyxXQUFXLEVBQUUsZ0JBQWdCO1lBQzdCLE9BQU8sRUFBRSxrQkFBa0I7WUFDM0IsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUUsY0FBYztRQUN4QyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsZUFBZTtRQUUxQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSx5QkFBeUI7UUFDekQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtRQUU5RCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RELGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7UUFDdEQsZ0RBQWdEO0lBQ3hELENBQUM7SUFFTyxjQUFjLENBQUMscUJBQWdDO1FBQ25ELHFDQUFxQztRQUNyQyxvQkFBb0I7UUFFcEIsYUFBYTtRQUNoQix3QkFBd0I7UUFDckIsdURBQXVEO1FBQ3ZELHNFQUFzRTtRQUV0RSxNQUFNLEtBQUssR0FBRyxJQUFJLDhCQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUM5QyxXQUFXLEVBQUUsZUFBZTtZQUM1QixPQUFPLEVBQUUscUJBQXFCO1lBQzlCLEtBQUssRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFFLHFCQUFxQjtRQUU5QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BELFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSx3QkFBd0I7UUFDbkQsdURBQXVEO1FBQ3ZELHNFQUFzRTtRQUUxRSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0NBQ0o7QUFuR0Qsc0NBbUdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGFtYmRhUmVzdEFwaSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheVwiO1xuaW1wb3J0IHsgSUZ1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmludGVyZmFjZSBTd25BcGlHYXRld2F5UHJvcHMge1xuICAgIHByb2R1Y3RNaWNyb3NlcnZpY2U6IElGdW5jdGlvbixcbiAgICBiYXNrZXRNaWNyb3NlcnZpY2U6IElGdW5jdGlvbixcbiAgICBvcmRlcmluZ01pY3Jvc2VydmljZXM6IElGdW5jdGlvblxufVxuXG5leHBvcnQgY2xhc3MgU3duQXBpR2F0ZXdheSBleHRlbmRzIENvbnN0cnVjdCB7ICAgIFxuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN3bkFwaUdhdGV3YXlQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIC8vIFByb2R1Y3QgYXBpIGdhdGV3YXlcbiAgICAgICAgdGhpcy5jcmVhdGVQcm9kdWN0QXBpKHByb3BzLnByb2R1Y3RNaWNyb3NlcnZpY2UpO1xuICAgICAgICAvLyBCYXNrZXQgYXBpIGdhdGV3YXlcbiAgICAgICAgdGhpcy5jcmVhdGVCYXNrZXRBcGkocHJvcHMuYmFza2V0TWljcm9zZXJ2aWNlKTtcbiAgICAgICAgLy8gT3JkZXJpbmcgYXBpIGdhdGV3YXlcbiAgICAgICAgdGhpcy5jcmVhdGVPcmRlckFwaShwcm9wcy5vcmRlcmluZ01pY3Jvc2VydmljZXMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlUHJvZHVjdEFwaShwcm9kdWN0TWljcm9zZXJ2aWNlOiBJRnVuY3Rpb24pIHtcbiAgICAgIC8vIFByb2R1Y3QgbWljcm9zZXJ2aWNlcyBhcGkgZ2F0ZXdheVxuICAgICAgLy8gcm9vdCBuYW1lID0gcHJvZHVjdFxuXG4gICAgICAvLyBHRVQgL3Byb2R1Y3RcbiAgICAgIC8vIFBPU1QgL3Byb2R1Y3RcblxuICAgICAgLy8gU2luZ2xlIHByb2R1Y3Qgd2l0aCBpZCBwYXJhbWV0ZXJcbiAgICAgIC8vIEdFVCAvcHJvZHVjdC97aWR9XG4gICAgICAvLyBQVVQgL3Byb2R1Y3Qve2lkfVxuICAgICAgLy8gREVMRVRFIC9wcm9kdWN0L3tpZH1cblxuICAgICAgY29uc3QgYXBpZ3cgPSBuZXcgTGFtYmRhUmVzdEFwaSh0aGlzLCAncHJvZHVjdEFwaScsIHtcbiAgICAgICAgcmVzdEFwaU5hbWU6ICdQcm9kdWN0IFNlcnZpY2UnLFxuICAgICAgICBoYW5kbGVyOiBwcm9kdWN0TWljcm9zZXJ2aWNlLFxuICAgICAgICBwcm94eTogZmFsc2VcbiAgICAgIH0pO1xuICBcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhcGlndy5yb290LmFkZFJlc291cmNlKCdwcm9kdWN0Jyk7XG4gICAgICBwcm9kdWN0LmFkZE1ldGhvZCgnR0VUJyk7IC8vIEdFVCAvcHJvZHVjdFxuICAgICAgcHJvZHVjdC5hZGRNZXRob2QoJ1BPU1QnKTsgIC8vIFBPU1QgL3Byb2R1Y3RcbiAgICAgIFxuICAgICAgY29uc3Qgc2luZ2xlUHJvZHVjdCA9IHByb2R1Y3QuYWRkUmVzb3VyY2UoJ3tpZH0nKTsgLy8gcHJvZHVjdC97aWR9XG4gICAgICBzaW5nbGVQcm9kdWN0LmFkZE1ldGhvZCgnR0VUJyk7IC8vIEdFVCAvcHJvZHVjdC97aWR9XG4gICAgICBzaW5nbGVQcm9kdWN0LmFkZE1ldGhvZCgnUFVUJyk7IC8vIFBVVCAvcHJvZHVjdC97aWR9XG4gICAgICBzaW5nbGVQcm9kdWN0LmFkZE1ldGhvZCgnREVMRVRFJyk7IC8vIERFTEVURSAvcHJvZHVjdC97aWR9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVCYXNrZXRBcGkoYmFza2V0TWljcm9zZXJ2aWNlOiBJRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gQmFza2V0IG1pY3Jvc2VydmljZXMgYXBpIGdhdGV3YXlcbiAgICAgICAgLy8gcm9vdCBuYW1lID0gYmFza2V0XG5cbiAgICAgICAgLy8gR0VUIC9iYXNrZXRcbiAgICAgICAgLy8gUE9TVCAvYmFza2V0XG5cbiAgICAgICAgLy8gLy8gU2luZ2xlIGJhc2tldCB3aXRoIHVzZXJOYW1lIHBhcmFtZXRlciAtIHJlc291cmNlIG5hbWUgPSBiYXNrZXQve3VzZXJOYW1lfVxuICAgICAgICAvLyBHRVQgL2Jhc2tldC97dXNlck5hbWV9XG4gICAgICAgIC8vIERFTEVURSAvYmFza2V0L3t1c2VyTmFtZX1cblxuICAgICAgICAvLyBjaGVja291dCBiYXNrZXQgYXN5bmMgZmxvd1xuICAgICAgICAvLyBQT1NUIC9iYXNrZXQvY2hlY2tvdXRcblxuICAgICAgICBjb25zdCBhcGlndyA9IG5ldyBMYW1iZGFSZXN0QXBpKHRoaXMsICdiYXNrZXRBcGknLCB7XG4gICAgICAgICAgICByZXN0QXBpTmFtZTogJ0Jhc2tldCBTZXJ2aWNlJyxcbiAgICAgICAgICAgIGhhbmRsZXI6IGJhc2tldE1pY3Jvc2VydmljZSxcbiAgICAgICAgICAgIHByb3h5OiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBiYXNrZXQgPSBhcGlndy5yb290LmFkZFJlc291cmNlKCdiYXNrZXQnKTtcbiAgICAgICAgYmFza2V0LmFkZE1ldGhvZCgnR0VUJyk7ICAvLyBHRVQgL2Jhc2tldFxuICAgICAgICBiYXNrZXQuYWRkTWV0aG9kKCdQT1NUJyk7ICAvLyBQT1NUIC9iYXNrZXRcblxuICAgICAgICBjb25zdCBzaW5nbGVCYXNrZXQgPSBiYXNrZXQuYWRkUmVzb3VyY2UoJ3t1c2VyTmFtZX0nKTtcbiAgICAgICAgc2luZ2xlQmFza2V0LmFkZE1ldGhvZCgnR0VUJyk7ICAvLyBHRVQgL2Jhc2tldC97dXNlck5hbWV9XG4gICAgICAgIHNpbmdsZUJhc2tldC5hZGRNZXRob2QoJ0RFTEVURScpOyAvLyBERUxFVEUgL2Jhc2tldC97dXNlck5hbWV9XG5cbiAgICAgICAgY29uc3QgYmFza2V0Q2hlY2tvdXQgPSBiYXNrZXQuYWRkUmVzb3VyY2UoJ2NoZWNrb3V0Jyk7XG4gICAgICAgIGJhc2tldENoZWNrb3V0LmFkZE1ldGhvZCgnUE9TVCcpOyAvLyBQT1NUIC9iYXNrZXQvY2hlY2tvdXRcbiAgICAgICAgICAgIC8vIGV4cGVjdGVkIHJlcXVlc3QgcGF5bG9hZCA6IHsgdXNlck5hbWUgOiBzd24gfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlT3JkZXJBcGkob3JkZXJpbmdNaWNyb3NlcnZpY2VzOiBJRnVuY3Rpb24pIHtcbiAgICAgICAgLy8gT3JkZXJpbmcgbWljcm9zZXJ2aWNlcyBhcGkgZ2F0ZXdheVxuICAgICAgICAvLyByb290IG5hbWUgPSBvcmRlclxuXG4gICAgICAgIC8vIEdFVCAvb3JkZXJcblx0ICAgIC8vIEdFVCAvb3JkZXIve3VzZXJOYW1lfVxuICAgICAgICAvLyBleHBlY3RlZCByZXF1ZXN0IDogeHh4L29yZGVyL3N3bj9vcmRlckRhdGU9dGltZXN0YW1wXG4gICAgICAgIC8vIG9yZGVyaW5nIG1zIGdyYXAgaW5wdXQgYW5kIHF1ZXJ5IHBhcmFtZXRlcnMgYW5kIGZpbHRlciB0byBkeW5hbW8gZGJcblxuICAgICAgICBjb25zdCBhcGlndyA9IG5ldyBMYW1iZGFSZXN0QXBpKHRoaXMsICdvcmRlckFwaScsIHtcbiAgICAgICAgICAgIHJlc3RBcGlOYW1lOiAnT3JkZXIgU2VydmljZScsXG4gICAgICAgICAgICBoYW5kbGVyOiBvcmRlcmluZ01pY3Jvc2VydmljZXMsXG4gICAgICAgICAgICBwcm94eTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIGNvbnN0IG9yZGVyID0gYXBpZ3cucm9vdC5hZGRSZXNvdXJjZSgnb3JkZXInKTtcbiAgICAgICAgb3JkZXIuYWRkTWV0aG9kKCdHRVQnKTsgIC8vIEdFVCAvb3JkZXIgICAgICAgIFxuICAgIFxuICAgICAgICBjb25zdCBzaW5nbGVPcmRlciA9IG9yZGVyLmFkZFJlc291cmNlKCd7dXNlck5hbWV9Jyk7XG4gICAgICAgIHNpbmdsZU9yZGVyLmFkZE1ldGhvZCgnR0VUJyk7ICAvLyBHRVQgL29yZGVyL3t1c2VyTmFtZX1cbiAgICAgICAgICAgIC8vIGV4cGVjdGVkIHJlcXVlc3QgOiB4eHgvb3JkZXIvc3duP29yZGVyRGF0ZT10aW1lc3RhbXBcbiAgICAgICAgICAgIC8vIG9yZGVyaW5nIG1zIGdyYXAgaW5wdXQgYW5kIHF1ZXJ5IHBhcmFtZXRlcnMgYW5kIGZpbHRlciB0byBkeW5hbW8gZGJcbiAgICBcbiAgICAgICAgcmV0dXJuIHNpbmdsZU9yZGVyO1xuICAgIH1cbn0iXX0=
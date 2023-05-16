"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwnDatabase = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
class SwnDatabase extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        //product table
        this.productTable = this.createProductTable();
        //basket table
        this.basketTable = this.createBasketTable();
        //order table
        this.orderTable = this.createOrderTable();
    }
    // Product DynamoDb Table Creation
    // product : PK: id -- name - description - imageFile - price - category
    createProductTable() {
        const productTable = new aws_dynamodb_1.Table(this, 'product', {
            partitionKey: {
                name: 'id',
                type: aws_dynamodb_1.AttributeType.STRING
            },
            tableName: 'product',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return productTable;
    }
    // Basket DynamoDb Table Creation
    // basket : PK: userName -- items (SET-MAP object) 
    // item1 - { quantity - color - price - productId - productName }
    // item2 - { quantity - color - price - productId - productName }
    createBasketTable() {
        const basketTable = new aws_dynamodb_1.Table(this, 'basket', {
            partitionKey: {
                name: 'userName',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            tableName: 'basket',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return basketTable;
    }
    // Order DynamoDb Table Creation
    // order : PK: userName - SK: orderDate -- totalPrice - firstName - lastName - email - address - paymentMethod - cardInfo
    createOrderTable() {
        const orderTable = new aws_dynamodb_1.Table(this, 'order', {
            partitionKey: {
                name: 'userName',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            sortKey: {
                name: 'orderDate',
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            tableName: 'order',
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST
        });
        return orderTable;
    }
}
exports.SwnDatabase = SwnDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBNEM7QUFDNUMsMkRBQXFGO0FBQ3JGLDJDQUF1QztBQUV2QyxNQUFhLFdBQVksU0FBUSxzQkFBUztJQU10QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUNwQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWhCLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzlDLGNBQWM7UUFDZCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzVDLGFBQWE7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsd0VBQXdFO0lBQ2hFLGtCQUFrQjtRQUN4QixNQUFNLFlBQVksR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM5QyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUMzQjtZQUNELFNBQVMsRUFBRSxTQUFTO1lBQ3BCLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtTQUN6QyxDQUFDLENBQUM7UUFDSCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsaUNBQWlDO0lBQzdCLG1EQUFtRDtJQUNqRCxpRUFBaUU7SUFDakUsaUVBQWlFO0lBQy9ELGlCQUFpQjtRQUN2QixNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUM1QyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU07YUFDM0I7WUFDRCxTQUFTLEVBQUUsUUFBUTtZQUNuQixhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLFdBQVcsRUFBRSwwQkFBVyxDQUFDLGVBQWU7U0FDekMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVELGdDQUFnQztJQUNoQyx5SEFBeUg7SUFDakgsZ0JBQWdCO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ3hDLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUMzQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsV0FBVztnQkFDakIsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUMzQjtZQUNELFNBQVMsRUFBRSxPQUFPO1lBQ2xCLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87WUFDcEMsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtTQUMzQyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0NBRUo7QUFwRUQsa0NBb0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVtb3ZhbFBvbGljeSB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQXR0cmlidXRlVHlwZSwgQmlsbGluZ01vZGUsIElUYWJsZSwgVGFibGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgU3duRGF0YWJhc2UgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuXG4gICAgcHVibGljIHJlYWRvbmx5IHByb2R1Y3RUYWJsZTogSVRhYmxlO1xuICAgIHB1YmxpYyByZWFkb25seSBiYXNrZXRUYWJsZTogSVRhYmxlO1xuICAgIHB1YmxpYyByZWFkb25seSBvcmRlclRhYmxlOiBJVGFibGU7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgICBcbiAgICAgICAgIC8vcHJvZHVjdCB0YWJsZVxuICAgICAgICAgdGhpcy5wcm9kdWN0VGFibGUgPSB0aGlzLmNyZWF0ZVByb2R1Y3RUYWJsZSgpO1xuICAgICAgICAgLy9iYXNrZXQgdGFibGVcbiAgICAgICAgIHRoaXMuYmFza2V0VGFibGUgPSB0aGlzLmNyZWF0ZUJhc2tldFRhYmxlKCk7XG4gICAgICAgICAvL29yZGVyIHRhYmxlXG4gICAgICAgICB0aGlzLm9yZGVyVGFibGUgPSB0aGlzLmNyZWF0ZU9yZGVyVGFibGUoKTsgXG4gICAgfVxuXG4gICAgLy8gUHJvZHVjdCBEeW5hbW9EYiBUYWJsZSBDcmVhdGlvblxuICAgIC8vIHByb2R1Y3QgOiBQSzogaWQgLS0gbmFtZSAtIGRlc2NyaXB0aW9uIC0gaW1hZ2VGaWxlIC0gcHJpY2UgLSBjYXRlZ29yeVxuICAgIHByaXZhdGUgY3JlYXRlUHJvZHVjdFRhYmxlKCkgOiBJVGFibGUge1xuICAgICAgY29uc3QgcHJvZHVjdFRhYmxlID0gbmV3IFRhYmxlKHRoaXMsICdwcm9kdWN0Jywge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICAgIH0sXG4gICAgICAgIHRhYmxlTmFtZTogJ3Byb2R1Y3QnLFxuICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgIGJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1RcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHByb2R1Y3RUYWJsZTtcbiAgICB9XG5cbiAgICAvLyBCYXNrZXQgRHluYW1vRGIgVGFibGUgQ3JlYXRpb25cbiAgICAgICAgLy8gYmFza2V0IDogUEs6IHVzZXJOYW1lIC0tIGl0ZW1zIChTRVQtTUFQIG9iamVjdCkgXG4gICAgICAgICAgLy8gaXRlbTEgLSB7IHF1YW50aXR5IC0gY29sb3IgLSBwcmljZSAtIHByb2R1Y3RJZCAtIHByb2R1Y3ROYW1lIH1cbiAgICAgICAgICAvLyBpdGVtMiAtIHsgcXVhbnRpdHkgLSBjb2xvciAtIHByaWNlIC0gcHJvZHVjdElkIC0gcHJvZHVjdE5hbWUgfVxuICAgIHByaXZhdGUgY3JlYXRlQmFza2V0VGFibGUoKSA6IElUYWJsZSB7XG4gICAgICBjb25zdCBiYXNrZXRUYWJsZSA9IG5ldyBUYWJsZSh0aGlzLCAnYmFza2V0Jywge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgICBuYW1lOiAndXNlck5hbWUnLFxuICAgICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgICB9LFxuICAgICAgICB0YWJsZU5hbWU6ICdiYXNrZXQnLFxuICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgIGJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1RcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGJhc2tldFRhYmxlO1xuICAgIH1cblxuICAgIC8vIE9yZGVyIER5bmFtb0RiIFRhYmxlIENyZWF0aW9uXG4gICAgLy8gb3JkZXIgOiBQSzogdXNlck5hbWUgLSBTSzogb3JkZXJEYXRlIC0tIHRvdGFsUHJpY2UgLSBmaXJzdE5hbWUgLSBsYXN0TmFtZSAtIGVtYWlsIC0gYWRkcmVzcyAtIHBheW1lbnRNZXRob2QgLSBjYXJkSW5mb1xuICAgIHByaXZhdGUgY3JlYXRlT3JkZXJUYWJsZSgpIDogSVRhYmxlIHtcbiAgICAgIGNvbnN0IG9yZGVyVGFibGUgPSBuZXcgVGFibGUodGhpcywgJ29yZGVyJywge1xuICAgICAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICAgICAgbmFtZTogJ3VzZXJOYW1lJyxcbiAgICAgICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc29ydEtleToge1xuICAgICAgICAgICAgbmFtZTogJ29yZGVyRGF0ZScsXG4gICAgICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRhYmxlTmFtZTogJ29yZGVyJyxcbiAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgICAgYmlsbGluZ01vZGU6IEJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gb3JkZXJUYWJsZTtcbiAgICB9XG5cbn1cblxuIl19
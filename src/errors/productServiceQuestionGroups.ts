import { BaseError } from './baseError'

export class ProductServiceQuestionGroupsFetchAllFailed extends BaseError {
  public name = 'ProductServiceQuestionGroupsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all product service question groups', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionGroupsFetchOneFailed extends BaseError {
  public name = 'ProductServiceQuestionGroupsFetchOneFailed'
  constructor(public message: string = 'Could not fetch single product service question group', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionGroupsGetMetaFailed extends BaseError {
  public name = 'ProductServiceQuestionGroupsGetMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for product service question groups', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionGroupsCreationFailed extends BaseError {
  public name = 'ProductServiceQuestionGroupsCreationFailed'
  constructor(public message: string = 'Could not create product service question groups', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionGroupsPutFailed extends BaseError {
  public name = 'ProductServiceQuestionGroupsPutFailed'
  constructor(public message: string = 'Could not update product service question groups', properties?: any) {
    super(message, properties)
  }
}

export class ProductServiceQuestionGroupsBookFailed extends BaseError {
  public name = 'ProductServiceQuestionGroupsBookFailed'
  constructor(public message: string = 'Could not book transfer in product service question groups', properties?: any) {
    super(message, properties)
  }
}

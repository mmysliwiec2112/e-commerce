export interface CartItem {
    id: string
}

export interface CartItemList<TItemType extends CartItem> {
    item: TItemType

    quantity: number[]
}
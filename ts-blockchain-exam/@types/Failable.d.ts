/*
추후에 블록이 생성될 때 올바르게 생성된 블록인지 검증하기 위한 용도로 사용된다.
*/
declare type Result<R> = { isError: false; value: R };
declare type Failure<E> = { isError: true; error: E };
declare type Failable<R, E> = Result<R> | Failure<E>;

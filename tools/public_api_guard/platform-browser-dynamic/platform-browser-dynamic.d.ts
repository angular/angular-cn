/** @experimental */
export declare class JitCompilerFactory implements CompilerFactory {
    createCompiler(options?: CompilerOptions[]): Compiler;
}

/** @stable */
export declare const platformBrowserDynamic: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

/** @experimental */
export declare const RESOURCE_CACHE_PROVIDER: Provider[];

/** @stable */
export declare const VERSION: Version;
